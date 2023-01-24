
import { Sprite } from 'pixi.js'

import { Globals } from '../../Globals'
import { IncomingObject } from '../IncomingObject'
import { spritesData } from './data'


const offsets = spritesData.map(({ offset }) => offset ), elapses = spritesData.map(({ elapse }) => [ 0, elapse ])

export class Surroundings {
  constructor() {
    this.sprites = []
    spritesData.forEach(({ name, x, y, scale }) => {
      const sprite = new Sprite( Globals.Resources.images[ name ].texture )
      this.sprites.push( sprite )
      this.initialize( sprite, x, y, scale )
    })
  }

  update ( dt ) {
    this.sprites.forEach(( sprite, idx ) => {
      elapses[ idx ][ 0 ] += dt
      if ( elapses[ idx ][ 1 ] > elapses[ idx ][ 0 ]) return
      elapses[ idx ][ 0 ] = 0
      
      const data = spritesData[ idx ]
      if ( !IncomingObject.move( sprite, offsets[ idx ] ))
        this.initialize( sprite, data.x, data.y, data.scale )
    })
  }

  initialize( sprite, x, y, scale ) {
    sprite.x = x
    sprite.y = y
    sprite.scale.set( scale )
  }
}
