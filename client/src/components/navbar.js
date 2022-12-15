import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div id='navbar-container'>
      <Link className='navbar-link' to='/'>Home</Link>
      <Link className='navbar-link' to='/about-us'>About Us</Link>
      <Link className='navbar-link' to='/login'>Login</Link>
      <Link className='navbar-link' to='/character-creator'>Character Creator</Link>
    </div>
  )
}