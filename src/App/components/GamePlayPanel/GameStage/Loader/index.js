
import { images } from './images'
import { Globals } from '../Globals'


export class Loader {
  constructor( loader ) {
    this.loader = loader
    this.images = images
  }

  preload() {
    return new Promise( resolve => {
      for ( let r in this.images ) this.loader.add( r, this.images[ r ])
      this.loader.load(( _, images ) => {
        Globals.Resources.images = images
        resolve()
      })
    })
  }
}