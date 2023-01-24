
import { CarPosition } from '../Car'


export const explosionImage = require( '../../../../../../assets/explosion_spritesheet.avif' ),
animationId = 'fire',
imageWidth = 6720,
imageHeight = 3245,
imageScale = 1,
imageRows = 5,
imageColums = 6,
explosionAnimation = 0.2,
sourceSize = { w: imageWidth, h: imageHeight }, spriteSourceSize = { x: 0, y: 0, w: imageWidth, h: imageHeight },
explosion = {
  meta: {
    image: explosionImage,
    format: 'RGBA8888',
    size: { w: imageWidth, h: imageHeight },
    scale: imageScale
  },
  frames: {},
  animations: {}
},
explodeAt = {[ CarPosition.ENEMYLEFT ]: -100, [ CarPosition.ENEMYCENTER ]: 150, [ CarPosition.ENEMYRIGHT ]: 400 }
