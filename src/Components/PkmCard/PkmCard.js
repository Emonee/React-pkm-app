import React, { useState } from 'react'
import PkmInfo from '../PkmInfo/PkmInfo'
import './PkmCard.css'

const PkmCard = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  function toggleInfo() {
    setShowInfo(!showInfo)
  }
  
  return (
    <>
      <div className='pkm-card-container' onClick={toggleInfo}>
        <h3>{props.pkmName}</h3>
        <p>#{props.pkmNum.padStart(3, 0)}</p>
        <img
          src={`https://naramsim.github.io/Colosseum/images/pokemons/${props.pkmNum}.svg`}
          alt={props.pkmName}
        />
      </div>
      {showInfo && <PkmInfo pkm={props.pkmNum} closeInfo={toggleInfo}/>}
    </>
    
  );
}

export default PkmCard;
