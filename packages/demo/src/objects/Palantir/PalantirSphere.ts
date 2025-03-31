import * as THREE from 'three'
import { SceneObject } from 'types/SceneObject'

import PerlinNoiseTexture from './rgb-256x256.png'

export class PalantirSphere implements SceneObject {
  public geometry = new THREE.SphereGeometry(1, 18, 18)
  public texture = new THREE.TextureLoader().load(PerlinNoiseTexture)

  public material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false, // Prevent depth buffer from blocking objects behind
    uniforms: {
      time: { value: 0.0 },
      perlinTexture: { value: this.texture },
      emissiveColor: { value: null },
      strength: { value: 2.0 },
    },
    vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    fragmentShader: `
        varying vec3 vPosition;
        uniform float time;
        uniform float strength;
        uniform sampler2D perlinTexture;
        uniform vec3 emissiveColor;

        void main() {
          float angle = atan(vPosition.z, vPosition.x);
          float elevation = atan(vPosition.y, length(vPosition.xz));
          float radius = 1.0 + sin(time * 10.0 + angle) * 0.1;

          vec3 distortedPosition = vec3(
            radius * cos(elevation) * cos(angle),
            radius * sin(elevation),
            radius * cos(elevation) * sin(angle)
          );

          vec2 uv1 = vec2(angle / (2.0 * 3.14159), elevation / 3.14159);
          vec2 uv2 = vec2(angle / (2.0 * 3.14159), elevation / 3.14159);
          uv1 += vec2(time * 0.5, -time * 0.5);
          uv2 += vec2(-time * 0.3, time * 0.3);

          float noise1 = texture2D(perlinTexture, uv1).r;
          float noise2 = texture2D(perlinTexture, uv2).g;

          float effect = noise1 * noise2 * strength;
          vec3 finalColor = emissiveColor * effect;

          gl_FragColor = vec4(finalColor, effect);
        }
      `,
  })

  public mesh = new THREE.Mesh(this.geometry, this.material)

  private tiltQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    THREE.MathUtils.degToRad(-23), // Tilt angle
  )
  private deltaQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    -0.01, // Rotation speed
  )

  constructor(options: { strength: number; color: THREE.Color }) {
    this.texture.wrapS = THREE.RepeatWrapping
    this.texture.wrapT = THREE.RepeatWrapping

    this.material.uniforms.emissiveColor.value = options.color
    this.material.uniforms.strength.value = options.strength

    this.mesh.applyQuaternion(this.tiltQuaternion)
  }

  public get object3D() {
    return this.mesh
  }

  public animate() {
    this.material.uniforms.time.value += 0.003
    this.mesh.applyQuaternion(this.deltaQuaternion)
  }
}
