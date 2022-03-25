import React, { useState } from 'react';
import PkmInfo from '../PkmInfo/PkmInfo'
import './SearchPkm.css'

const SearchPkm = (props) => {
  const pkmList = props.pkmList && props.pkmList.map(obj => obj.name)

  const [searchInput, setSearchInput] = useState('')
  const pkmDataList = pkmList && pkmList.map(name => <option key={name}>{name}</option>)
  const [showSearch, setShowSearch] = useState(false)
  const [error, setError] = useState(false);
  const valueWithOutSpaces = searchInput.trim().toLocaleLowerCase()

  function toggleSearch() {    
    setError(false)
    if(Number.isInteger(Number(valueWithOutSpaces)) && valueWithOutSpaces >= 1 && valueWithOutSpaces <= 151) return setShowSearch(!showSearch)
    if(pkmList.indexOf(valueWithOutSpaces) === -1) return setError(true)
    setShowSearch(!showSearch)
  }

  function handleChange(event) {
    setSearchInput(event.target.value)
  }

  return (
    <div className='search-pkm-container'>
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
      {error && <p>pokemon not found. try with an integer number or a first gen pkm</p>}
      <button onClick={toggleSearch}>Search a Pkm</button>
      {showSearch && <PkmInfo pkm={valueWithOutSpaces} closeInfo={toggleSearch}/>}
    </div>
  );
}

export default SearchPkm;