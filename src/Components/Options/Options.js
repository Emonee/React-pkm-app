import React, { useState } from 'react';
import PkmInfo from '../PkmInfo/PkmInfo'
import './Options.css'

const Options = (props) => {
  const [searchInput, setSearchInput] = useState('')
  function handleChange(event) {
    setSearchInput(event.target.value)
  }

  const [showSearch, setShowSearch] = useState(false)
  function toggleSearch() {
    if(pkmList.indexOf(searchInput) === -1) return alert('pokemon no encontrado')
    setShowSearch(!showSearch)
  }

  const pkmList = props.pkmList && props.pkmList.map(obj => obj.name)
  const pkmDataList = pkmList && pkmList.map(name => <option key={name}>{name}</option>)

  return (
    <div className='options-container'>
      <button onClick={props.addTeam}>Add a Team</button>
      <button onClick={props.deleteLastTeam}>Delete last Team</button>
      <button onClick={props.deleteTeams}>Delete All</button>
      <input
        onKeyPress={() => {if(window.event.keyCode === 13) toggleSearch()}}
        onChange={handleChange}
        type='search'
        value={searchInput}
        list='pkm-list-names'
      />
      <datalist id='pkm-list-names'>
        {pkmDataList}
      </datalist>
      <button onClick={toggleSearch}>Search a Pkm</button>
      {showSearch && <PkmInfo pkm={searchInput} closeInfo={toggleSearch}/>}
    </div>
  );
}

export default Options;
