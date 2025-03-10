import React from 'react'
import Event from './Event.js'
import './Predictions.css'

function Predictions() {
  const ufc_311_winners = [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
  const ufc_311_odds = [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
  const ufc_fight_night_1_odds = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0];
  const ufc_fight_night_1_winners = [0, 0, 1, 0, -1, 1, 1, 1, 1, 1, 1, 1, -1];
  const ufc_312_odds = [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1]
  const ufc_312_winners = [1, 1, 0, -2, 1, 0, 1, 1, 0, 1, 1, 1, -1]
  const ufc_fight_night_2_odds = [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0];
  const ufc_fight_night_2_winners = [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0];
  const ufc_fight_night_3_odds = [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1];
  const ufc_fight_night_3_winners = [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1];
  const ufc_fight_night_4_odds = [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1];

  return (
    <div>
      <h1 className='head'>Upcoming Event</h1>
      <Event title={"UFC Fight Night: Kape vs. Almabayev"} event="FightNight4" odds={ufc_fight_night_4_odds} result={null} />
      <h1 className='head'>Past Events</h1>
      <Event title={"UFC Fight Night: Cejudo vs Song"} event={"FightNight3"} odds={ufc_fight_night_3_odds} result={ufc_fight_night_3_winners} />
      <Event title={"UFC Fight Night: Cannonier vs Rodrigues"} event={"FightNight2"} odds={ufc_fight_night_2_odds} result={ufc_fight_night_2_winners} />
      <Event title={"UFC 312: Du Plessis vs Strickland 2"} event="UFC312" odds={ufc_312_odds} result={ufc_312_winners} />
      <Event title={"UFC Fight Night: Adesanya vs. Imavov"} event={"FightNight1"} odds={ufc_fight_night_1_odds} result={ufc_fight_night_1_winners} />
      <Event title={"UFC 311: Makhachev vs. Moicano"} event={"UFC311"} odds={ufc_311_odds} result={ufc_311_winners} />
    </div>
  )
}

export default Predictions