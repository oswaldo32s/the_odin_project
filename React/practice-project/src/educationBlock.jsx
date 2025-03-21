import { useState } from "react";
import FormInput from "./formInput"
import styles from './education.module.css'

export default function EducationBlock({index, data, handleOnChange}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  function toggleEditable() {
    editable ? setEditable(false) : setEditable(true)
  }

  return (
  editable ? (
      <form 
        action="#"
        data-key={index}
        className={styles.educationForm}
      > 
        {
          Object.entries(data).map(([key, value], index) => {
            return <FormInput
              style={styles.formInput}
              key={index}
              label={key}
              nameID={key}
              value={value}
              type={(key == 'startDate' || key == 'endDate') ? 'date' : 'text'}
              onChange={handleOnChange}
            />
          })
        }
        <button onClick={() => {
          toggleEditable() 
          setHover(false)}} type='button'>Complete</button>
      </form>
    ) : (
      <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={styles.educationBlock}
      >
        <div className={styles.educationBlockContainer}>
          <div>
            <h2 className={styles.educationDegree}>{data.degree}</h2>
            <h3 className={styles.educationUniversity}>{data.university}</h3>
          </div>
          <div className={styles.educationDateSection}>
            <p>{data.startDate}</p>
            <p>{data.endDate}</p>
          </div>
        </div>
        {hover && <button onClick={toggleEditable}>Edit</button>}
      </article>
    )
  )
}