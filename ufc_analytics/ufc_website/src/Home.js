import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import logo from './ufc-logo.svg'

function Home() {
  return (
    <div className='homepage'>
      <div className='wrap'>
        <img src={logo} alt="UFC" className='logo' /> 
        <h1 className='header'>Analytics</h1>
      </div>
      <div className='buttons'>
        <Link to='./predictions' className='prediction-button'>Future Fight Predictions</Link>
        <Link to='./video-analytics'className='video-analytics-button'>Video Analysis of Fights</Link>
      </div>
    </div>
  )
}

export default Home