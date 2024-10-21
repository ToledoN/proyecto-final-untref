import React, { useState } from "react";
import "../css/Selector.css";

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

export default Selector;
