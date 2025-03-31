import { Palantir } from 'objects/Palantir'
import { Starfield } from 'objects/Starfield'
import * as THREE from 'three'

import { App } from './App'
import githubLogo from './github/github-mark.png'

const starfield = new Starfield()

const palantir1 = new Palantir({
  strength: 1.3,
  color: new THREE.Color('#B8E3E9'),
  img: githubLogo,
})

const palantir2 = new Palantir({
  strength: 2,
  color: new THREE.Color('#ff8b4d'),
  img: githubLogo,
})

App.instance.addObject(starfield)
App.instance.addObject(palantir1)
App.instance.addObject(palantir2)

palantir1.object3D.position.set(3, 0, 0)
palantir2.object3D.position.set(-3, 0, 0)

App.instance.init()
