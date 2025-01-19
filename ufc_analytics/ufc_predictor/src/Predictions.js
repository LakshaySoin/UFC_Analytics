import React from 'react'
import Event from './Event.js'
import './Predictions.css'

function Predictions() {
  const ufc_311_winners = [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
  const ufc_311_odds = [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];

  return (
    <div>
      <h1 className='head'>Upcoming Event</h1>
      <h1 className='head'>Past Events</h1>
      <Event title={"UFC 311: Makhachev vs. Moicano"} event={"UFC311"} odds={ufc_311_odds} result={ufc_311_winners} />
    </div>
  )
}

export default Predictions