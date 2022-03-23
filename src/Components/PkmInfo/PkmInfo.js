import React, { useState, useEffect } from 'react';
import './PkmInfo.css'

const PkmInfo = (props) => {
  const [pkmData, setPkmData] = useState(false)
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.pkm}`)
      .then(res => res.json())
      .then(json => ({
        name: json.name,
        number: json.id,
        stats: {
          hp: json.stats[0].base_stat,
          attack: json.stats[1].base_stat,
          defense: json.stats[2].base_stat,
          specialAttack: json.stats[3].base_stat,
          specialDefense: json.stats[4].base_stat,
          speed: json.stats[5].base_stat
        },
        types: json.types.map(obj => obj.type.name)
      }))
      .then(data => setPkmData(data))
  }, []);

  const typesArr = pkmData && pkmData.types.map(type => <span key={type}> {type}</span>)

  return (
    <>
      <div className='modal-container' onClick={props.closeInfo}></div>
      <div className='pkm-info-container'>
        {pkmData ? 
        (
          <>
            <img id='data-image' src={`https://naramsim.github.io/Colosseum/images/pokemons/${pkmData.number}.svg`} alt={pkmData.name}/>
            <div className='pkm-data-container'>
              <div className='name-number-container'>
                <h2>{pkmData.name}</h2>
                <p>#{pkmData.number.toString().padStart(3, 0)}</p>
              </div>
              <p>{typesArr.length > 1 ? 'Types:' : 'Type:'}{typesArr}</p>
              <ul id='pkm-stats-ul'>
                <li><span>HP:</span><span>{pkmData.stats.hp}</span></li>
                <li><span>Attack:</span><span>{pkmData.stats.attack}</span></li>
                <li><span>Defense:</span><span>{pkmData.stats.defense}</span></li>
                <li><span>Special Attack:</span><span>{pkmData.stats.specialAttack}</span></li>
                <li><span>Special Defense:</span><span>{pkmData.stats.specialDefense}</span></li>
                <li><span>Speed:</span><span>{pkmData.stats.speed}</span></li>
              </ul>
            </div>
          </>
        )
        : <p>loading data...</p>}
      </div>
    </>
  );
}

export default PkmInfo;
