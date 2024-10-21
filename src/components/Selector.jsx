import { useState } from "react";
import "../css/Selector.css";
import PropTypes from "prop-types";

function Selector({ label, options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="selector">
      <label>{label}:</label>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option disabled value="">
          Selecciona una opción
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.factor}>
            {option.id}
          </option>
        ))}
      </select>
    </div>
  );
}

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Selector;
