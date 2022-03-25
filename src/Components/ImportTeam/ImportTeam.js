import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './ImportTeam.css'

const ImportTeam = (props) => {
  const [code, setCode] = useState('')
  function handleChange(event) {
    setCode(event.target.value)
  }
  const [error, seterror] = useState(false);
  function handleClick() {
    seterror(false)
    const codeArr = code.split('-')
    const pkmToImport = [...codeArr]
    pkmToImport.shift()
    if(codeArr.length !== 7) return seterror(true)
    if(!pkmToImport.every(value => Number(value) <= 151)) return seterror(true)
    if(!pkmToImport.every(value => Number(value) >= 1)) return seterror(true)
    props.setPkmTeams(prevState => {
      return (
        [...prevState,
          {
            teamId: nanoid(),
            teamName: codeArr[0],
            firstPkm: codeArr[1],
            secondPkm: codeArr[2],
            thirdPkm: codeArr[3],
            fourthPkm: codeArr[4],
            fifthPkm: codeArr[5],
            sixthPkm: codeArr[6]
          }
        ])
    })
    setCode('')
  }

  return (
    <div className='import-container'>
      <input
        onChange={handleChange}
        type='text'
        value={code}
      />
      {error && <p>Invalid Code</p>}
      <button onClick={handleClick}>Import Team</button>
    </div>
  );
}

export default ImportTeam;
