import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [characterValidity, setCharacterValidity] = useState([]);

  const validateString = () => {
    // Validación de la cadena completa
    const regex = /^((X[YZ][A-Z]-[1-9][0-9][0-9]-[A-Z])|(X[YZ][A-Z]-[0-9][0-9][1-9]-[A-Z])|(X[YZ][A-Z]-[0-9][1-9][0-9]-[A-Z])|(Y[A-V][A-Z]-[1-9][0-9][0-9]-[A-Z])|(Y[A-V][A-Z]-[0-9][0-9][1-9]-[A-Z])|(Y[A-V][A-Z]-[0-9][1-9][0-9]-[A-Z]))$/;
    const isValidInput = regex.test(inputValue);

    setIsValid(isValidInput);

    // Validación de caracteres individuales
    const inputArray = inputValue.split('');
    const charValidityArray = inputArray.map((char, index) => {
      let charIsValid = true;

      // Mensaje para mostrar el carácter
      let charMessage = '';

      // Validar el primer carácter
      if (index === 0) {
        charIsValid = char === 'X' || char === 'Y';
        charMessage = char === 'X' ? 'X es válido' : char === 'Y' ? 'Y es válido' : 'Inválido';
      }

      // Validar el segundo carácter
      if (index === 1) {
        if (inputArray[0] === 'X') {
          charIsValid = char === 'Y' || char === 'Z';
          charMessage = char === 'Y' ? 'Y es válido' : char === 'Z' ? 'Z es válido' : 'Inválido';
        } else if (inputArray[0] === 'Y') {
          charIsValid = /^[A-V]$/.test(char);
          charMessage = /^[A-V]$/.test(char) ? `${char} es válido` : 'Inválido';
        }
      }

      if (index === 2) {
        charIsValid = /^[A-Z]$/.test(char);
        charMessage = /^[A-Z]$/.test(char) ? `${char} es válido` : `${char} Inválido` ;
      }

      if (index === 4) {
        charIsValid = /^[0-9]$/.test(char);
        charMessage = /^[0-9]$/.test(char) ? `${char} es válido` : `${char} Inválido` ;
      }

      if (index === 5) {
        charIsValid = /^[0-9]$/.test(char);
        charMessage = /^[0-9]$/.test(char) ? `${char} es válido` : `${char} Inválido` ;
      }

      if (index === 6) {
        if (inputArray[4] === '0') {
          charIsValid = /^[1-9]$/.test(char);
          charMessage = /^[1-9]$/.test(char) ? `${char} es válido` : ` ${char} es Inválido` ;
        } else if (inputArray[4] && inputArray[5] === '1, 2, 3, 4, 5, 6 ,7 , 8, 9') {
          charIsValid = /^[0-9]$/.test(char);
          charMessage = /^[0-9]$/.test(char) ? `${char} es válido` : `${char} es Inválido` ;
        }
      }
      // Validar que los guiones sean correctos
      if (index === 3 || index === 7) {
        charIsValid = char === '-';
        charMessage = charIsValid ? '- es válido' : ` Inválido` ;
      }

      // Validar el último carácter (letras)
      if (index === 8) {
        charIsValid = /^[A-Z]$/.test(char);
        charMessage = /^[A-Z]$/.test(char) ? `${char} es válido` : `${char} Inválido` ;
      }

      return { char, isValid: charIsValid, message: `q${index} ${charMessage}` };
    });

    setCharacterValidity(charValidityArray);
  };

  return (
    <div>
      <h1>Cadena de Validación</h1>
      <input
        type="text"
        placeholder="Ingrese una cadena"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={validateString}>Validar</button>
      {isValid !== null && (
        <div>
          {isValid ? (
            <p>La cadena es válida</p>
          ) : (
            <p>La cadena no es válida</p>
          )}
        </div>
      )}
      <div>
        <p>Caracteres individuales:</p>
        <ul>
          {characterValidity.map((item, index) => (
            <li key={index}>
              {item.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;