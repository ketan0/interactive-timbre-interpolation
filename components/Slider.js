const Slider = ({ min, max, step, value, onChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={onChange}
  />
)

export default Slider
