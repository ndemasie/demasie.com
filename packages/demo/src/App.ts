import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { SceneObject } from './types/SceneObject'

export class App {
  public renderer: THREE.WebGLRenderer
  public camera: THREE.PerspectiveCamera
  public controls: OrbitControls
  public scene: THREE.Scene

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
    this.camera.position.z = 10

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.scene = new THREE.Scene()
    // this.scene.fog = new THREE.FogExp2(0x000000, 0.3)

    this.resize?.() // Setup size
    this.animate?.() // Start animation
  }

  public addObject(obj: SceneObject) {
    obj.object3D && this.scene.add(obj.object3D)
    this.sceneObjects.push(obj)
  }

  public animate() {
    window.requestAnimationFrame(() => this.animate())
    for (const obj of this.sceneObjects) {
      obj?.animate?.(this.camera)
    }

    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  public resize() {
    for (const obj of this.sceneObjects) {
      obj?.resize?.(window.innerWidth, window.innerHeight)
    }

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
