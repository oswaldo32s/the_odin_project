import { useState } from "react";
import FormInput from "./formInput"
import styles from './work.module.css'

export default function WorkBlock({index, data, handleOnChange}) {
  const [hover, setHover] = useState(false)
  const [editable, setEditable] = useState(false)

  function toggleEditable() {
    editable ? setEditable(false) : setEditable(true)
  }

  return (
  editable ? (
      <form 
        className={styles.formContainer}
        action="#"
        data-key={index}
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
        <button onClick={(() => {
          toggleEditable()
          setHover(false)
          })} type='button'>Complete</button>
      </form>
    ) : (
      <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={styles.workBlock}
      >
        <div className={styles.workBlockContainer}>
          <div className={styles.workBlock}>
            <div>
              <h2 className={styles.workPosition}>{data.position}</h2>
              <h3 className={styles.workCompany}>{data.company}</h3>
            </div>
            <div className={styles.workDateSection}>
              <p>{data.startDate}</p>
              <p>{data.endDate ? data.endDate : 'present'}</p>
            </div>
          </div>
          <p className={styles.workResponsability}>{data.responsability}</p>
        </div>
        {hover && <button onClick={toggleEditable}>Edit</button>}
      </article>
    )
  )
}