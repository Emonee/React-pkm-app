import React from 'react';
import PkmCard from '../PkmCard/PkmCard';
import './TeamCard.css'

const TeamCard = (props) => {
  const teamCode = `${props.teamData.teamName}-${props.teamData.firstPkm}-${props.teamData.secondPkm}-${props.teamData.thirdPkm}-${props.teamData.fourthPkm}-${props.teamData.fifthPkm}-${props.teamData.sixthPkm}`
  function handleClick() {
    navigator.clipboard.writeText(teamCode)
  }
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
        <p>Team code:</p>
        <p>{teamCode}</p>
        <div className='button-container'>
          <button id='code-button' onClick={handleClick}>Copy Code</button>
          <button id='close-team-button' onClick={props.toggleCard}>Close</button>
        </div>
        
      </div>
    </>
    
  );
}

export default TeamCard;
