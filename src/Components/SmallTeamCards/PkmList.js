import React, { useState } from 'react';
import PkmInfo from '../PkmInfo/PkmInfo';

const PkmList = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  function toggleInfo() {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <li onClick={toggleInfo}>{props.name}</li>
      {showInfo && <PkmInfo pkm={props.num + 1} closeInfo={toggleInfo}/>}
    </>
  )
}

export default PkmList;
