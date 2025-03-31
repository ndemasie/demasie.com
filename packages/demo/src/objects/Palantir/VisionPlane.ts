import * as THREE from 'three'
import { SceneObject } from 'types/SceneObject'

import { App } from '../../App'

export class VisionPlane implements SceneObject {
  public geometry: THREE.PlaneGeometry
  public texture: THREE.Texture
  public material: THREE.MeshBasicMaterial
  public mesh: THREE.Mesh

  constructor(options: { path: string; size: number }) {
    this.geometry = new THREE.PlaneGeometry(options.size, options.size)
    this.texture = new THREE.TextureLoader().load(options.path)
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.texture.minFilter = THREE.LinearFilter
    this.texture.magFilter = THREE.LinearFilter
    this.texture.wrapS = THREE.ClampToEdgeWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping
  }

  public get object3D() {
    return this.mesh
  }

  public animate() {
    this.mesh.lookAt(App.instance.camera.position)
  }
}
