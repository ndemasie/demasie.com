import { App } from './App'
import { Sandstorm } from './objects/Sandstorm'
import { Starfield } from './objects/Starfield'

App.instance.addObject(new Starfield())
App.instance.addObject(new Sandstorm())

document.body.appendChild(App.instance.renderer.domElement)
window.addEventListener('resize', App.instance.resize, false)
