import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Shop from './Shop'
import Contact from './Contact'
import '../styles/ShopComponent.css'
import '../styles/NavComponent.css'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/snowboards' component={Shop}/>
      <Route path='/contact' component={Contact}/>
    </Switch>
  </main>
)

export default Main
