import * as THREE from 'three'
import { SceneObject } from 'types/SceneObject'

export class Sphere implements SceneObject {
  public geometry = new THREE.SphereGeometry(2)

  public material = new THREE.MeshPhysicalMaterial({
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
    metalness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  })

  public mesh = new THREE.Mesh(this.geometry, this.material)

  constructor() {}

  public get object3D() {
    return this.mesh
  }
}
