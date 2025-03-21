import WorkBlock from "./workBlock"
import styles from './work.module.css'

export default function WorkExperience({experience, handleOnChange}) {
  return (
    <section className={styles.workSection}>
      {experience.map((work, index) => {
        return (
          <WorkBlock
            key={index}
            index={index}
            data={work}
            handleOnChange={handleOnChange}
          />
        )
      })}
    </section>
  )
}