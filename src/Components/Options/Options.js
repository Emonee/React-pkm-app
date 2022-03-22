import React from 'react';
import './Options.css'

const Options = (props) => {
  return (
    <div className='options-container'>
      <button onClick={props.addTeam}>Add a Team</button>
      <button onClick={props.deleteLastTeam}>Delete last Team</button>
      <button onClick={props.deleteTeams}>Delete All</button>
    </div>
  );
}

export default Options;
