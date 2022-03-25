import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './AddTeamForm.css'

const AddTeamForm = (props) => {
  const [form, setForm] = useState({
    teamId: nanoid(),
    teamName: '',
    firstPkm: '',
    secondPkm: '',
    thirdPkm: '',
    fourthPkm: '',
    fifthPkm: '',
    sixthPkm: '',
  })
  function handleChange(event) {
    const {name, value, type, checked} = event.target
      setForm(prevState => {
        return {
          ...prevState,
          [name]: type === "checkbox" ? checked : value
        }
      })
  }
  const [nameError, setNameError] = useState(false);
  const[submitError, setSubmitError] = useState(false)
  function handleSubmit(event) {
    setSubmitError(false)
    setNameError(false)
    event.preventDefault()
    const regEx = /-/
    console.log(form.team)
    if(regEx.test(form.teamName)) {
      setNameError(true)
    } else if(Object.values(form).every(ele => ele)) {
      props.setPkmTeams(prevState => ([
        ...prevState,
        form
      ]))
      props.togleForm(prevState => !prevState)      
    } else {
      setSubmitError(true)
    }
  }

  function closeForm() {
    props.togleForm(prevState => !prevState)
  }

  const selectOptions = props.data.map(obj => <option value={props.data.indexOf(obj) + 1} key={obj.name}>{obj.name}</option>)

  return (
    <>
      <div className='modal-container' onClick={closeForm}></div>
      <form onSubmit={handleSubmit} className='add-team-form'>
        <input
          type='text'
          placeholder="Pkm Team Name"
          onChange={handleChange}
          name="teamName"
          value={form.teamName}
        />
        {nameError && <p>Please dont use the "-" character in the name</p>}
        <select
          onChange={handleChange}
          name='firstPkm'
          value={form.firstPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        <select
          onChange={handleChange}
          name='secondPkm'
          value={form.secondPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        <select
          onChange={handleChange}
          name='thirdPkm'
          value={form.thirdPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        <select
          onChange={handleChange}
          name='fourthPkm'
          value={form.fourthPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        <select
          onChange={handleChange}
          name='fifthPkm'
          value={form.fifthPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        <select
          onChange={handleChange}
          name='sixthPkm'
          value={form.sixthPkm}
        >
          <option value=''>Pick a Pkm</option>
          {selectOptions}
        </select>
        {nameError && <p>Please correct the name input</p>}
        {submitError && <p>You have to select all six Pkm's and type a name for your team</p>}
        <button>Submit Team</button>
      </form>
    </>
  );
}

export default AddTeamForm;