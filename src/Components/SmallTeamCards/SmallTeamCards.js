import React, { useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import PkmList from './PkmList';
import './SmallTeamCards.css'

const SmallTeamCards = (props) => {
  const [viewMore, setViewMore] = useState(false)
  const toggleCard = () => setViewMore(!viewMore)

  return (
    <div className='small-team-cards-content'>
      <h2>{props.teamData.teamName}</h2>
      <button onClick={toggleCard}>{viewMore ? 'Show Less' : 'Show More'}</button>
      <ul>
        <PkmList name={props.pkmList[props.teamData.firstPkm - 1].name} num={props.teamData.firstPkm - 1}/>
        <PkmList name={props.pkmList[props.teamData.secondPkm - 1].name} num={props.teamData.secondPkm - 1}/>
        <PkmList name={props.pkmList[props.teamData.thirdPkm - 1].name} num={props.teamData.thirdPkm - 1}/>
        <PkmList name={props.pkmList[props.teamData.fourthPkm - 1].name} num={props.teamData.fourthPkm - 1}/>
        <PkmList name={props.pkmList[props.teamData.fifthPkm - 1].name} num={props.teamData.fifthPkm - 1}/>
        <PkmList name={props.pkmList[props.teamData.sixthPkm - 1].name} num={props.teamData.sixthPkm - 1}/>
      </ul>
      {viewMore && <TeamCard pkmList={props.pkmList} teamData={props.teamData} toggleCard={toggleCard}/>}
    </div>
  );
}

export default SmallTeamCards;
