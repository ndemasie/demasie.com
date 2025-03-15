import { Fire } from 'objects/Fire'
import { Sandstorm } from 'objects/Sandstorm'
import { Starfield } from 'objects/Starfield'

import { App } from './App'

App.instance.addObject(new Starfield())
App.instance.addObject(new Sandstorm())
App.instance.addObject(new Fire())

document.body.appendChild(App.instance.renderer.domElement)
window.addEventListener('resize', App.instance.resize, false)
