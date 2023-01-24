
import './style.css';
import settingImage from '../../../../../assets/setting_button.png'
import { players, page, avatars } from './data'


export default function Players() {
  const renderPlayer = ( player, key ) => {
    return (
      <div key={ key } className='player'>
        <img src={ avatars[ key ]} alt='avatar' className='avatar'/>
        <div>{ player }</div>
      </div>
    )
  }

  return (
    <div className='players'>
      <div className='players-header'>
        <div>Players</div>
        <div className='page'>{ page }</div>
      </div>
      <div className='setting'>
        <button id='settings'>
          <img src={ settingImage } alt='settings' className='icon'/>
          <div className='label'>Setting</div>
        </button>
      </div>
      { players.map(( player, key ) => renderPlayer( player, key ))}
    </div>
  )
}
