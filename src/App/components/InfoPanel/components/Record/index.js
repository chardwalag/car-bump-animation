
import './style.css';
import { headerData, records } from './data'


export default function Record() {
  const renderHeader = data => {
    const [ time, rank, population ] = data
    return (
      <div className='record-header'>
        <div className='time'>{ time }</div>
        <div className='last-record'>Your Last Record</div>
        <div className='badge'>
          <div className='rank'>{`# ${ rank }${ getRankSuffix( rank )}`}</div>
          <div className='population'>{ `from ${ population }` }</div>
        </div>
      </div>
    )
  }

  const getRankSuffix = rank => {
    switch ( rank ) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
    }
  }

  const renderRecord = ( record, key ) => {
    const [ name, time, rank ] = record
    return (
      <li key={ key } className='item'>
        <div className='item-name'>{ name }</div>
        <div className='item-record'>
          <div className='item-record-label'>Record</div>
          <div className='item-record-time'>{ time }</div>
        </div>
        <div className='item-record-rank'>
          <div className='item-record-rank-label'>Rank</div>
          <div className='item-record-rank-value'>
            <span className='item-record-rank-number'>{ rank }</span>
            <span className='item-record-rank-suffix'>{ getRankSuffix( rank )}</span>
          </div>
        </div>
      </li>
    )
  }

  const renderRecords = records => {
    return (
      <ul className='record-list'>
        { records.map(( record, i ) => renderRecord( record, i ))}
      </ul>
    )
  }

  return (
    <div className='record'>
      { renderHeader( headerData )}
      { renderRecords( records )}
    </div>
  )
}
