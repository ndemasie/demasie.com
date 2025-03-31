import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { SceneObject } from 'types/SceneObject'

export class App {
  public renderer: THREE.WebGLRenderer
  public camera: THREE.PerspectiveCamera
  public controls: OrbitControls
  public scene: THREE.Scene
  private composer: EffectComposer

  private sceneObjects: SceneObject[] = []

  // Singleton
  private static _instance: App
  public static get instance() {
    this._instance ||= new App()
    return this._instance
  }

  private constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      100,
    )
    this.camera.zoom = 0.7
    this.camera.position.copy(this.initialCameraPosition)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.maxDistance = 36
    this.controls.minDistance = 2.6

    this.scene = new THREE.Scene()

    // Add post-processing
    const renderPass = new RenderPass(this.scene, this.camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2.0, // Strength for a stronger bloom
      0.02, // Radius for larger bloom
      0.01, // Threshold for more bloom
    )

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
  }

  private clock = new THREE.Clock()
  private cameraSweepDuration = 2
  private initialCameraPosition = new THREE.Vector3(-25, 15, 10)
  private targetCameraPosition = new THREE.Vector3(-1.2, 1.6, 5)
  private animateCameraSweep() {
    const t = Math.min(
      this.clock.getElapsedTime() / this.cameraSweepDuration,
      1,
    )
    if (t < 1) {
      this.camera.position.lerpVectors(
        this.initialCameraPosition,
        this.targetCameraPosition,
        t,
      )
    }

    // Stop the clock when the sweep is complete
    if (t === 1) {
      this.clock.stop()
    }
  }

  public addObject(obj: SceneObject) {
    if (!obj.object3D) return

    this.scene.add(obj.object3D)
    this.sceneObjects.push(obj)
  }

  public animate() {
    this.animateCameraSweep()

    for (const obj of this.sceneObjects) {
      obj?.animate?.()
    }

    this.composer.render()
    this.controls.update()
  }

  public resize() {
    for (const obj of this.sceneObjects) {
      obj?.resize?.()
    }

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setSize(window.innerWidth, window.innerHeight)
  }

  public init() {
    document.body.appendChild(this.renderer.domElement)
    this.clock.start() // Start the clock for the camera sweep
    this.renderer.setAnimationLoop(this.animate.bind(this))

    this.resize()
    window.addEventListener('resize', this.resize.bind(this), false)
  }
}
