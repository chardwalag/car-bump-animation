
import Grid from '@mui/material/Grid'

import Record from './components/Record'
import Players from './components/Players'
import Chat from './components/Chat'
import './style.css'


export default function InfoPanel() {
  return (
    <div className='info'>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 4 }>
          <Record />
        </Grid>
        <Grid item xs={ 4 }>
          <Chat />
        </Grid>
        <Grid item xs={ 4 }>
          <Players />
        </Grid>
      </Grid>
    </div>
  )
}
