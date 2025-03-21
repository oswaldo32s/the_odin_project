import EducationBlock from "./educationBlock"
import styles from './education.module.css'

export default function EducationExperience({experience, handleOnChange}) {
  return (
    <section className={styles.educationSection}>
      {experience.map((education, index) => {
        return (
          <EducationBlock
            key={index}
            index={index}
            data={education}
            handleOnChange={handleOnChange}
          />
        )
      })}
    </section>
  )
}