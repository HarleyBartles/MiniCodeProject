import React from 'react'
import { Link } from 'react-router-dom'

export class Home extends React.Component {
  static displayName = Home.name

  render () {
    return (
      <div>
        <h1>Welcome to Harley Bartles' Mini Code Assessment Project</h1>
        <div>Click <Link to='/calculator'>here</Link> to get started</div>
      </div>
    )
  }
}
