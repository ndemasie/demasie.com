/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from 'three'

export abstract class SceneObject {
  public geometry?: THREE.SphereGeometry | THREE.BufferGeometry
  public material?: THREE.Material | THREE.PointsMaterial
  public mesh?: THREE.Mesh
  public points?: THREE.Points

  public object3D?: THREE.Object3D

  public abstract animate?(camera: THREE.Camera): void
  public abstract resize?(width: number, height: number): void
}
