import styles from '../styles/Home.module.css'

const Dropdown = ({ label, values, selectedValue, changeHandler }) => (
  <div className={styles.colcontainer}>
    <p>{label}</p>
    <select value={selectedValue} onChange={changeHandler}>
      {values.map(value =>
        <option value={value} key={value}>{value}</option>
      )}
    </select>
  </div>
)

export default Dropdown
