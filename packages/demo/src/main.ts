import { Palantir } from 'objects/Palantir'
import { Starfield } from 'objects/Starfield'
import * as THREE from 'three'

import { App } from './App'
import githubLogo from './github/github-mark.png'

const starfield = new Starfield()

const palantiri = [
  new Palantir({
    strength: 1.3,
    color: new THREE.Color('#B8E3E9'),
    img: githubLogo,
  }),
  new Palantir({
    strength: 2.2,
    color: new THREE.Color('#ff8b4d'),
    img: githubLogo,
  }),
  new Palantir({
    strength: 2.2,
    color: new THREE.Color('#00FF00'),
    img: githubLogo,
  }),
]
const radius = 2.6

for (let i = 0; i < palantiri.length; i++) {
  const angle = (i / palantiri.length) * Math.PI * 2

  palantiri[i].object3D.position.set(
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius,
  )
}

for (let i = 0; i < palantiri.length; i++) {
  App.instance.addObject(palantiri[i])
}

App.instance.addObject(starfield)
App.instance.init()
