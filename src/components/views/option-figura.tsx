import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface RadioProps {
  setProjectType: (newType: string) => void;  // Cambiado para aceptar una función personalizada
}

const Radio = ({ setProjectType }: RadioProps) => {
  const [selected, setSelected] = useState("Superficie");

  const handleChange = (value: string) => {
    setSelected(value);
    setProjectType(value);  // Llamamos a la función pasada como prop
  };

  useEffect(() => {
    setProjectType(selected); // Actualiza el tipo de proyecto cuando cambia la selección
  }, [selected, setProjectType]);

  return (
    <StyledWrapper selected={selected}>
      <div className="radio-inputs">
        <label htmlFor="Superficie">
          <input
            id="Superficie"
            className="radio-input"
            type="radio"
            name="engine"
            value="Superficie"
            checked={selected === "Superficie"}
            onChange={() => handleChange("Superficie")}
            aria-checked={selected === "Superficie"}
          />
          <span className="radio-tile">
            <span className="radio-icon"></span>
            <span className="radio-label">Figura</span>
          </span>
        </label>
        <label htmlFor="Carretera">
          <input
            id="Carretera"
            className="radio-input"
            type="radio"
            name="engine"
            value="Carretera"
            checked={selected === "Carretera"}
            onChange={() => handleChange("Carretera")}
            aria-checked={selected === "Carretera"}
          />
          <span className="radio-tile">
            <span className="radio-icon"></span>
            <span className="radio-label">Línea</span>
          </span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ selected: string }>`
  .radio-input {
    display: none;
  }

  .radio-inputs {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .radio-inputs label {
    margin: 0;
  }

  .radio-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      border-color: #F7700A;
      background-color: #e6f2ff;
      transform: scale(1.05);
    }
  }

  .radio-input:checked + .radio-tile {
    border-color: ${({ selected }) =>
    selected === "Superficie" ? "#CA3938" : "#ffc107"};
    background-color: ${({ selected }) =>
    selected === "Superficie" ? "#e9f7ef" : "#fff8e1"};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    color: ${({ selected }) => (selected === "Superficie" ? "#CA3938" : "#ffc107")};
  }

  .radio-icon {
    margin-right: 10px;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .radio-input:checked + .radio-tile .radio-icon {
    background-color: ${({ selected }) =>
    selected === "Superficie" ? "#CA3938" : "#ffc107"};
    color: white;
  }

  .radio-label {
    font-size: 16px;
    font-weight: 500;
  }
`;

export default Radio;
