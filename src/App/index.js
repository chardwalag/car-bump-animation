
import Container from '@mui/material/Container'

import GamePlayPanel from './components/GamePlayPanel'
import InfoPanel from './components/InfoPanel'
import './style.css'


export default function App() {
  return (
    <Container fixed className='app'>
      <GamePlayPanel />
      <InfoPanel />
    </Container>
  )
}
