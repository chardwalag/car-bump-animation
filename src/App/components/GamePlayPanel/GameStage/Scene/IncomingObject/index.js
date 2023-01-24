
import { vpoint } from './data'


export class IncomingObject {

  static move( sprite, speed = 5 ) {
    const f = (( sprite.x + sprite.width / 2 ) < vpoint.x ) ? -1 : 1
    if (( -1 !== f || ( sprite.x + sprite.width <= 0 )) && ( 1 !== f || sprite.x >= window.innerWidth ))
      return false

    const px = sprite.x, py = sprite.y, ph = sprite.height, pw = sprite.width, l1 = py - vpoint.y, 
    w1 = vpoint.x - px - pw, qx = px + f * speed, w2_ = vpoint.x - qx
    sprite.x = qx
    sprite.y = l1 * w2_ / ( vpoint.x - px ) + vpoint.y
    sprite.width = w2_ - ( sprite.y - vpoint.y ) * w1 / ( py - vpoint.y )
    sprite.height = sprite.width * ph / pw
    return true
  }
}
