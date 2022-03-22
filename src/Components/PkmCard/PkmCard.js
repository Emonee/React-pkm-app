import React from 'react';
import './PkmCard.css'

const PkmCard = (props) => {
  return (
    <div className='pkm-card-container'>
      <h3>{props.pkmName}</h3>
      <p>#{props.pkmNum.padStart(3, 0)}</p>
      <img
        src={`https://naramsim.github.io/Colosseum/images/pokemons/${props.pkmNum}.svg`}
        alt={props.pkmName}
      />
    </div>
  );
}

export default PkmCard;
