export default function FormInput({label, type = 'text', nameID, value='', onChange, style}) {
  return (
    type == 'textarea' ? (
      <div className={style}>
        <label htmlFor={nameID}>{label}</label>
        <textarea name={nameID} id={nameID} value={value} onChange={onChange}></textarea>
      </div>
    ) : (
      <div className={style}>
        <label htmlFor={nameID}>{label}</label>
        <input type={type} name={nameID} id={nameID} value={value} onChange={onChange}/>
      </div>
    )
  )
}