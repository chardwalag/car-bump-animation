
import { AnimatedSprite, Spritesheet, BaseTexture, utils } from 'pixi.js'

import { Globals } from '../../Globals'
import {
  animationId,
  explosion, explosionAnimation, explodeAt,
  imageWidth, imageColums, imageHeight, imageRows,
  spriteSourceSize, sourceSize,
} from './data'


export class Explosion {

  static async create( position ) {
    if ( Globals.explosionSprite ) {
      utils.clearTextureCache()
    }
    const explosion = Explosion.createExplosionAnimation( position ),
    spritesheet = new Spritesheet( BaseTexture.from( explosion.meta.image ), explosion )
    await spritesheet.parse()
    const sprite = new AnimatedSprite( spritesheet.animations[ animationId ])
    sprite.animationSpeed = explosionAnimation
    sprite.loop = false
    Globals.explosionSprite = sprite
    return sprite
  }

  static createExplosionAnimation( position ) {
    explosion.animations[ animationId ] = []
    for ( let i = 0, j = 0, w = imageWidth / imageColums, h = imageHeight / imageRows; i < imageRows; ++i ) {
      for ( let k = 0, frameId; k < imageColums; ++j, ++k ) {
        frameId = animationId + j
        explosion.animations[ animationId ].push( frameId )
        spriteSourceSize.x = explodeAt[ position ]
        explosion.frames[ frameId ] = {
          frame: { x: k * w, y: i * h, w, h },
          sourceSize,
          spriteSourceSize
        }
      }
    }
    return explosion
  }
}
