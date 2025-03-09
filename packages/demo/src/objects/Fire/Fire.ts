import * as THREE from 'three'
import { SceneObject } from 'types/SceneObject'

import fireImage from './fire.png'
import fragmentShader from './fragmentShader.glsl'

export class Fire implements SceneObject {
  public geometry = new THREE.SphereGeometry(1, 32, 32)

  public texture = new THREE.TextureLoader().load(fireImage)

  public material = new THREE.ShaderMaterial({
    // transparent: true,
    // side: THREE.BackSide,
    defines: { ITERATIONS: '4', OCTAVES: '3' },
    uniforms: {
      fireTexture: { value: this.texture },
      color: { value: new THREE.Color(0xeeeeee) },
      time: { value: 0.0 },
      seed: { value: Math.random() * 19.19 },
      invModelMatrix: { value: new THREE.Matrix4() },
      scale: { value: new THREE.Vector3(7, 7, 7) },
      noiseScale: { value: new THREE.Vector4(1, 2, 1, 0.3) },
      magnitude: { value: 1.0 },
      lacunarity: { value: 4.0 },
      gain: { value: 0.6 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      }`,
    fragmentShader,
  })

  public mesh = new THREE.Mesh(this.geometry, this.material)

  constructor() {
    this.texture.minFilter = THREE.LinearFilter
    this.texture.magFilter = THREE.LinearFilter
    this.texture.wrapS = THREE.ClampToEdgeWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping
  }

  public get object3D() {
    return this.mesh
  }

  public animate() {
    const invModelMatrix = this.material.uniforms.invModelMatrix.value
    this.mesh.updateMatrixWorld()
    invModelMatrix.copy(this.mesh.matrixWorld).invert()
    this.material.uniforms.invModelMatrix.value = invModelMatrix

    this.material.uniforms.time.value += 0.01
  }

  public resize(width: number, height: number) {
    this.material.uniforms.resolution.value.set(width, height)
  }
}
