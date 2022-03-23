import React, { useState, useEffect } from 'react';
import AddTeamForm from './Components/AddTeamForm/AddTeamForm'
import SmallTeamCards from './Components/SmallTeamCards/SmallTeamCards';
import Options from './Components/Options/Options';
import './App.css'

const App = () => {
  const [pkmTeams, setPkmTeams] = useState(JSON.parse(localStorage.getItem('pkmTeams')) || [])
  useEffect(() => {
    localStorage.setItem('pkmTeams', JSON.stringify(pkmTeams))
  }, [pkmTeams]);
  const deleteTeams = () => setPkmTeams([])
  const deleteLastTeam = () => {
    setPkmTeams(prevState => {
      const arr = [...prevState]
      arr.pop()
      return arr
    })
  }

  const [pkmList, setPkmList] = useState(false)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(json => setPkmList(json.results))
  }, []);

  const [showForm, setShowForm] = useState(false)
  const addTeam = () => {
    setShowForm(!showForm)
  }

  const smallCards = pkmTeams.map(obj => <SmallTeamCards teamData={obj} pkmList={pkmList} key={obj.teamId} />)

  return (
    <>
      <Options addTeam={addTeam} deleteLastTeam={deleteLastTeam} deleteTeams={deleteTeams} pkmList={pkmList}/>
      <div className='space-nav'></div>
      {showForm && <AddTeamForm data={pkmList} setPkmTeams={setPkmTeams} togleForm={setShowForm}/>}
      <div className='small-team-cards-container'>
        {pkmList ? smallCards : <h2>Loading Teams...</h2>}
      </div>
    </>
  );
}

export default App;