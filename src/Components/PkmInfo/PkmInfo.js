import React, { useState, useEffect } from 'react';
import './PkmInfo.css'

const PkmInfo = (props) => {
  console.log(props.pkm)
  const [pkmData, setPkmData] = useState(false)

  // -----------------------

  const pkmWeaknessAndResistances = (types) => {
    const totalWeakStrong = {};
  
    const pushValues = (dmgRelations) => {
      for(let n = 0; n < dmgRelations.double_damage_from.length; n++) {
        if(dmgRelations.double_damage_from[n].name in totalWeakStrong) {
          totalWeakStrong[dmgRelations.double_damage_from[n].name] *= 2; 
        } else {
          totalWeakStrong[dmgRelations.double_damage_from[n].name] = 2;
        }
      }
      for(let n = 0; n < dmgRelations.half_damage_from.length; n++) {
        if(dmgRelations.half_damage_from[n].name in totalWeakStrong) {
          totalWeakStrong[dmgRelations.half_damage_from[n].name] *= 0.5; 
        } else {
          totalWeakStrong[dmgRelations.half_damage_from[n].name] = 0.5;
        }
      }
      for(let n = 0; n < dmgRelations.no_damage_from.length; n++) {
        if(dmgRelations.no_damage_from[n].name in totalWeakStrong) {
          totalWeakStrong[dmgRelations.no_damage_from[n].name] *= 0; 
        } else {
          totalWeakStrong[dmgRelations.no_damage_from[n].name] = 0;
        }
      }
    }  
    
    fetch(`https://pokeapi.co/api/v2/type/${types[0]}`)
      .then(resp => resp.json())
      .then(json => json.damage_relations)
      .then(dmgRelations => {
        pushValues(dmgRelations);
        if(types.length > 1) {
          fetch(`https://pokeapi.co/api/v2/type/${types[1]}`)
          .then(resp => resp.json())
          .then(json => json.damage_relations)
          .then(dmgRelations => {
            pushValues(dmgRelations);
            setPkmData(prevState => ({...prevState, totalWeakStrong}))
            // return totalWeakStrong; // DOM something here!
          })
        }
        else {
          setPkmData(prevState => ({...prevState, totalWeakStrong}))
          // return totalWeakStrong;// DOM something here!
        }
      })
      .catch(error => console.error(error))
  }
  // -----------------------  

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
      .then(data => {
        setPkmData(data)
        return data
      })
      .then(data => pkmWeaknessAndResistances(data.types))
  }, [props.pkm]);

  const typeColor = str => {
    switch (str) {
      case 'normal':
        return '#A8A878'
      case 'fire':
        return '#F08030'
      case 'water':
        return '#6890F0'
      case 'grass':
        return '#78C850'
      case 'electric':
        return '#F8D030'
      case 'ice':
        return '#98D8D8'
      case 'fighting':
        return '#C03028'
      case 'poison':
        return '#A040A0'
      case 'ground':
        return '#E0C068'
      case 'flying':
        return '#A890F0'
      case 'psychic':
        return '#F75787'
      case 'bug':
        return '#A8B820'
      case 'rock':
        return '#B69E38'
      case 'ghost':
        return '#705898'
      case 'dark':
        return '#705848'
      case 'dragon':
        return '#7038f8'
      case 'steel':
        return '#b8b8d0'
      case 'fairy':
        return '#f0b6bc'
      default:
        return '#fff'
    }
  }

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
  }

  const typesArr = pkmData && pkmData.types.map(type => <span key={type}> {type}</span>)
  const weakArr = pkmData.totalWeakStrong && Object.entries(pkmData.totalWeakStrong).filter(arr => arr[1] > 1).sort((a, b) => b[1] - a[1]).map(num => <li className='types-weak-and-ress' style={{background: typeColor(num[0])}}>{capitalize(num[0])}: x{num[1]}</li>)
  const resArr = pkmData.totalWeakStrong && Object.entries(pkmData.totalWeakStrong).filter(arr => arr[1] < 1).sort((a, b) => b[1] - a[1]).map(num => <li className='types-weak-and-ress' style={{background: typeColor(num[0])}}>{capitalize(num[0])}: x{num[1]}</li>)

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
              {pkmData.totalWeakStrong && (
                <>
                  <p>Weaknesses (resive more dmg from)</p>
                  <ul className='weak-res-ul'>
                    {weakArr}
                  </ul>
                  <p>Resistances (resive less dmg from)</p>
                  <ul className='weak-res-ul'>
                    {resArr}
                  </ul>
                </>
              )}
            </div>
          </>
        )
        : <p>loading data...</p>}
      </div>
    </>
  );
}

export default PkmInfo;
