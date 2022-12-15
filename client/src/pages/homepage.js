import { Link } from 'react-router-dom'

export const Homepage = () => {
  return (
    <div id='hero-container'>
      <p id='main-card'>DND Companion</p>

      <div id='hero-btns-container'>
        <Link className='hero-link' to='/login'>Login</Link>
        <Link className='hero-link' to='/character-creator'>Character Creator</Link>
      </div>
    </div>
  )
}