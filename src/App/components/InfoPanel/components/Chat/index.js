
import './style.css';
import { justJoined, messages, statusMessage, currentMessage } from './data'


export default function Chat() {
  const renderJoiner = name => {
    return (
      <div className='joiner'>
        { `${ name } Has Joined the Game` }
      </div>
    )
  }

  const renderMessages = messages => {
    return messages.map(( message, key ) => renderMessage( message, key ))
  }

  const renderMessage = ( message, key ) => {
    return (
      <div key={ key } className='message'>
        { message }
      </div>
    )    
  }

  const renderStatusMessage = status => {
    return (
      <div className='status'>
        { status }
      </div>
    )
  }

  return (
    <div className='chat'>
      <div className='messages'>
        { renderJoiner( justJoined )}
        { renderMessages( messages )}
        { renderStatusMessage( statusMessage )}
      </div>
      <div className='controls'>
        <input type='text' value={ currentMessage } onChange={() => {}} id='entry'/>
        <button id='submit'>
          Send
        </button>
      </div>
    </div>
  )
}
