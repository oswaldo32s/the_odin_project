import './App.css'
import styles from './CV.module.css'
import React, { useState } from "react";
import PersonalSection from './personalSection';
import EducationExperience from './educationExperience';
import WorkExperience from './workExperience';

function App() {

  const [personalInformation, setPersonalInformation] = useState(
    {
      firstName: 'Oswaldo',
      lastName: 'Gonzalez',
      profession: 'Analytics Engineer',
      phoneNumber: '(331) 740 8022',
      email: 'oswaldo32gonzalez@gmail.com',
      aboutMe: 'Soy una persona muy trabajadora, con bastante experiencia en el trabajo en equipo. Tengo amplios conocimientos con el manejo de datos, soy una persona analitica con grandes habilidades sociales para trabajar en equipo.'
    })

    function updatePersonalInformation(e) {
      setPersonalInformation(prev => (
        {...prev, [e.target.name]: e.target.value}))
    }

  const [educationExperience, setEducationExperience] = useState([
    {
      degree: 'Industrial Engineer',
      university: 'Universidad de Guadalajara',
      startDate: '2018-08-01',
      endDate: '2025-07-01'
    }, 
    {
      degree: 'Computer Science',
      university: 'Hardvard',
      startDate: '2023-09-01',
      endDate: '2026-01-01'
    }
  ])

  function updateEducationExperience(e) {
    const index = e.target.closest('form').dataset.key
    const {name, value} = e.target

    setEducationExperience(prev => 
      prev.map((education, edIndex) => 
        edIndex == index ? {...education, [name]: value} : education
      )
    )
  }

  const [workExperience, setWorkExperience] = useState([{
    position: 'Analytics Engineer',
    company: 'RXO Logistics',
    startDate: '2022-10-17',
    endDate: 'present',
    responsability: 'process data with ETLs to create reporting for stakeholders to be able to analyse and take rational actions in the business.'
  },
  {
    position: ' BI Supervisor',
    company: 'Beliveo Mexico',
    startDate: '2019-10-17',
    endDate: '2022-10-01',
    responsability: 'process data with ETLs to create reporting for stakeholders to be able to analyse and take rational actions in the business.'
  }
])

  function updateWorkExperience(e) {
    const index = e.target.closest('form').dataset.key
    const {name, value} = e.target

    setWorkExperience(prev => 
      prev.map((work, wIndex) => 
        wIndex == index ? {...work, [name]: value} : work
      )
    )
  }

  return (
    <div className={styles.cv}>
      <PersonalSection
        personalData={personalInformation}
        handleOnChange={updatePersonalInformation}
      />
      <EducationExperience
        experience={educationExperience}
        handleOnChange={updateEducationExperience}
      />
      <WorkExperience
        experience={workExperience}
        handleOnChange={updateWorkExperience}
      />
    </div>
  )
}

export default App
