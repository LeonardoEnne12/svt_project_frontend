import React, { useState } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder || 'Selecione uma opção');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleToggle}>
        {selectedOption}
        <span>&#709;</span> {/* Certifique-se de que este é o caractere correto para a seta */}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li 
              key={index} 
              className="dropdown-item" 
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
