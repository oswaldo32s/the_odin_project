import './App.css'
import styles from './styles/CV.module.css'
import React, { useState } from "react";
import PersonalSection from './components/personalSection';
import EducationExperience from './components/educationExperience';
import WorkExperience from './components/workExperience';

function App() {

  const [personalInformation, setPersonalInformation] = useState(
    {
      firstName: 'Emma',
      lastName: 'Johnson',
      profession: 'Software Engineer',
      phoneNumber: '(415) 555-0198',
      email: 'emma.johnson@email.com',
      aboutMe: 'I am a dedicated and detail-oriented software engineer with a strong passion for developing scalable web applications. I enjoy solving complex problems and working collaboratively in a team environment to create impactful solutions.'
    })

    function updatePersonalInformation(e) {
      setPersonalInformation(prev => (
        {...prev, [e.target.name]: e.target.value}))
    }

  const [educationExperience, setEducationExperience] = useState([
    {
      degree: 'Bachelor of Science in Computer Science',
      university: 'Stanford University',
      startDate: '2015-09-01',
      endDate: '2019-06-15'
    },
    {
      degree: 'Master of Science in Data Science',
      university: 'Massachusetts Institute of Technology',
      startDate: '2019-09-01',
      endDate: '2021-06-15'
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

  function addEducationExperience(data) {
    setEducationExperience(prev => [...prev, data])
  }

  function deleteEducationExperience(e) {
    const index = e.target.closest('button').dataset.key
    setEducationExperience(prev => prev.filter((_, i) => i != index));
  }

  const [workExperience, setWorkExperience] = useState([
    {
      position: 'Software Engineer',
      company: 'Google',
      startDate: '2021-07-01',
      endDate: 'present',
      responsability: 'Develop and optimize backend services to enhance the scalability and performance of cloud-based applications.'
    },
    {
      position: 'Data Engineer',
      company: 'Amazon Web Services (AWS)',
      startDate: '2019-07-01',
      endDate: '2021-06-30',
      responsability: 'Designed and maintained ETL pipelines to process large-scale datasets for analytics and machine learning applications.'
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

  function addWorkExperience(data) {
    setWorkExperience(prev => [...prev, data])
  }


  function deleteWorkExperience(e) {
    const index = e.target.closest('button').dataset.key
    setWorkExperience(prev => prev.filter((_, i) => i != index));
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
        handleOnClick={addEducationExperience}
        handleDelete={deleteEducationExperience}
      />
      <WorkExperience
        experience={workExperience}
        handleOnChange={updateWorkExperience}
        handleOnClick={addWorkExperience}
        handleDelete={deleteWorkExperience}
      />
    </div>
  )
}

export default App
