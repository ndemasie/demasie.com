import * as THREE from 'three'
import { SceneObject } from 'types/SceneObject'

import { PalantirSphere } from './PalantirSphere'
import { VisionPlane } from './VisionPlane'

export class Palantir implements SceneObject {
  public group = new THREE.Group()

  private objPalantir: PalantirSphere
  private objVision: VisionPlane

  constructor(options: { strength: number; color: THREE.Color; img: string }) {
    this.objPalantir = new PalantirSphere(options)
    this.objVision = new VisionPlane({ path: options.img, size: 2 })

    this.group.add(this.objPalantir.object3D)
    this.group.add(this.objVision.object3D)
  }

  public get object3D() {
    return this.group
  }

  public animate() {
    this.objPalantir.animate?.()
    this.objVision.animate?.()
  }
}
