import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import '../styles/NavComponent.css'
import LogoImage from '../media/logo.gif'
import SearchImage from '../media/search.svg'

const NavContent = props => (
  <div className='navFull'>
    <Link to='/snowboards' className='navItem'><img className='appLogo' src={LogoImage} alt='Snowboards logo' /></Link>
    <Link to='/snowboards' className='navItem'>Team</Link>
    <Link to='/snowboards' className='navItem'>Events</Link>
    <Link to='/snowboards' className='navItem'>Experience</Link>
    <Link to='/snowboards' className='navItem'>Company</Link>
    <Link to='/contact' className='navItem'>Contact</Link>
    <form className='navItem right' onSubmit={e => e.preventDefault()}> {/* Keep page from reloading */}
      <input type='text' className='inputSearch' onChange={ props.onChange } name='value' placeholder='search' value={ props.value } />
      <input type='image' className='searchLogo' src={ SearchImage } alt='Search!' onClick={ props.fetchSearch } />
    </form>
  </div>
)

const NavBurgerContent = props => (
    <div className='navBurger'>
      <div className='burgerLogo' onClick={ props.toggleActiveId } id={ props.state.isActive.toString() }>
        <span /><span /><span />
      </div>
      <form className='navItem right' onSubmit={e => e.preventDefault()}> {/* Keep page from reloading*/}
        <input type='text' className='inputSearch' onChange={ props.onChange } name='value' placeholder='search' value={ props.state.value } />
        <input type='image' className='searchLogo' src={ SearchImage } alt='Search!' onClick={ props.fetchSearch } />
      </form>
      <div className='navBurgerLinks' id={ props.state.isActive.toString() }>
        <Link to='/snowboards' onClick={ props.toggleActiveId } className='navItem'>Shop</Link>
        <Link to='/snowboards' onClick={ props.toggleActiveId } className='navItem'>Team</Link>
        <Link to='/snowboards' onClick={ props.toggleActiveId } className='navItem'>Events</Link>
        <Link to='/snowboards' onClick={ props.toggleActiveId } className='navItem'>Experience</Link>
        <Link to='/snowboards' onClick={ props.toggleActiveId } className='navItem'>Company</Link>
        <Link to='/contact' onClick={ props.toggleActiveId } className='navItem'>Contact</Link>
      </div>
    </div>
)

export default class Header extends Component {
  state = {
    value: '', // Input search value
    isActive: false // Active id toggling
  }

  /* Search for countries from input entry. */
  fetchSearch = () => {
    let obj
    let result = ''
    fetch('https://restcountries.eu/rest/v2/name/' + this.state.value + '?fields=name')
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => {
      if (obj.status === 404) { // If search is empty, data-status goes 404
        return alert('Inga länder hittades')
      }
      for (let key in obj) {
        for (let val in obj[key]) {
          if (obj.length > 1) {
            result += key + '. ' + (obj[key][val]) + '\n' // Adds <number>. <country> to result-variable
          } else {
            result = obj[key][val] // If there only is one country in the result, that one is printed without number
          }
        }
      }
      alert(result) // Show result in alert-popup
    }).catch(() => { alert('Inga länder hittades') }) // No countries found? Alert to show it
  }

  // Toggle active id of burger navbar
  toggleActiveId = () => this.setState({ isActive: !this.state.isActive })

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    return (
      <nav>
        <NavContent
          value={ this.state.value }
          fetchSearch={ this.fetchSearch }
          onChange={ this.onChange }
        />
        <NavBurgerContent
          state={ this.state }
          fetchSearch={ this.fetchSearch }
          toggleActiveId={ this.toggleActiveId }
          onChange={ this.onChange }
        />
      </nav>
    )
  }
}
