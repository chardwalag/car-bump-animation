
import React, { useRef, useEffect } from 'react'
import { Application } from 'pixi.js'

import { Loader } from './Loader'
import { Director } from './Director'
import { Scene } from './Scene'
import { Globals } from './Globals'


export default function GameStage() {
  const ref = useRef( null )

  useEffect(() => {
    const app = new Application({ height: 700, width: 1000 })
    ref.current.appendChild( app.view )
    let director = Globals.director = new Director()
    app.stage.addChild( director.container )

    app.ticker.add( t => {
      director.update( t )
    })
    const loader = new Loader( app.loader )
    loader.preload().then(() => {
      director.start( new Scene())
    })
    
    return () => { app.destroy( true, true )}
  })

  return <div ref={ ref }></div>
}
