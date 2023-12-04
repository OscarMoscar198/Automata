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
 const charValidityArray = [];
 let isValid = true;
 
 for (let i = 0; i < inputArray.length; i++) {
   const char = inputArray[i];
   let charIsValid = true;
   let charMessage = '';
 
   if (i === 0) {
     charIsValid = char === 'X' || char === 'Y';
     charMessage = char === 'X' ? `q0 ${char} es válido` : char === 'Y' ? `q12 ${char} es válido` : 'Inválido';
   }
 
   if (i === 1) {
     if (inputArray[0] === 'Y') {
       charIsValid = /^[A-V]$/.test(char);
       charMessage = charIsValid ? `q13 ${char} es válido` : 'Inválido';
     } else if (inputArray[0] === 'X') {
       charIsValid = char === 'Y' || char === 'Z';
       charMessage = charIsValid ? `q1 ${char} es válido` : 'Inválido';
     } else {
       charIsValid = false;
       charMessage = 'Inválido';
     }
   }
 
   if (i === 2) {
     charIsValid = /^[A-Z]$/.test(char);
     charMessage = charIsValid ? `q3 ${char} es válido` : 'Inválido';
   }
 
   if (i === 3) {
     charIsValid = char === '-';
     charMessage = charIsValid ? `q4 ${char} es válido` : 'Inválido';
   }
 
   if (i === 4) {
     if (char === '0') {
       charMessage = `q5 ${char} es válido`;
     } else if (/^[1-9]$/.test(char)) {
       charMessage = `q8 ${char} es válido`;
     } else {
       charIsValid = false;
       charMessage = 'Inválido';
     }
   }
 
   if (i === 5) {
     if (inputArray[4] === '0') {
       if (char === '0') {
         charMessage = `q6 ${char} es válido`;
       } else if (/^[1-9]$/.test(inputArray[5])) {
         charIsValid = true;
         charMessage = `q6 ${char} es válido`;
       } else {
         charIsValid = false;
         charMessage = 'Inválido';
       }
     } else if (/^[1-9]$/.test(inputArray[4])) {
       charIsValid = /^[0-9]$/.test(char);
       charMessage = charIsValid ? `q9 ${char} es válido` : 'Inválido';
     } else {
       charIsValid = false;
       charMessage = 'Inválido';
     }
   }
 
   if (i === 6) {
     if (char === '0') {
       if (/^[1-9]$/.test(inputArray[4]) || /^[1-9]$/.test(inputArray[5])) {
         charIsValid = true;
         charMessage = `q7 ${char} es válido`;
       } else {
         charIsValid = false;
         charMessage = 'Inválido';
       }
     } else if (/^[1-9]$/.test(char)) {
       charMessage = `q7 ${char} es válido`;
     } else {
       charIsValid = false;
       charMessage = 'Inválido';
     }
   }
 
   if (i === 7) {
     charIsValid = char === '-';
     charMessage = charIsValid ? `q10 ${char} es válido` : 'Inválido';
   }
 
   if (i === 8) {
     charIsValid = /^[A-Z]$/.test(char);
     charMessage = charIsValid ? `q11 ${char} es válido` : 'Inválido';
   }
 
   charValidityArray.push({ char, isValid: charIsValid, message: charMessage });
 
   if (!charIsValid) {
     isValid = false;
     break;
   }
 }
 
 setCharacterValidity(charValidityArray);
 setIsValid(isValid);
  };

  return (
    <div>
      <h1>Cadena de Validación</h1>
      <input
        type="text"
        placeholder="Ingrese una cadena"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={9}
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