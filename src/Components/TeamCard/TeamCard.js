import React from 'react';
import PkmCard from '../PkmCard/PkmCard';
import './TeamCard.css'

const TeamCard = (props) => {
  return (
    <>
      <div onClick={props.toggleCard} className='modal-container'></div>
      <div className='team-container'>
        <h2>{props.teamData.teamName}</h2>
        <div className='pkms-container'>
          <PkmCard pkmName={props.pkmList[props.teamData.firstPkm - 1].name} pkmNum={props.teamData.firstPkm}/>
          <PkmCard pkmName={props.pkmList[props.teamData.secondPkm - 1].name} pkmNum={props.teamData.secondPkm}/>
          <PkmCard pkmName={props.pkmList[props.teamData.thirdPkm - 1].name} pkmNum={props.teamData.thirdPkm}/>
          <PkmCard pkmName={props.pkmList[props.teamData.fourthPkm - 1].name} pkmNum={props.teamData.fourthPkm}/>
          <PkmCard pkmName={props.pkmList[props.teamData.fifthPkm - 1].name} pkmNum={props.teamData.fifthPkm}/>
          <PkmCard pkmName={props.pkmList[props.teamData.sixthPkm - 1].name} pkmNum={props.teamData.sixthPkm}/>
        </div>
        <button id='close-team-button' onClick={props.toggleCard}>Close</button>
      </div>
    </>
    
  );
}

export default TeamCard;
