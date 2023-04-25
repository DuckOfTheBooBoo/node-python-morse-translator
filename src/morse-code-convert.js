const { objectKeys } = require('./utils');
const fs = require('fs');

/* eslint-disable quote-props */
const MORSE_TO_CHAR = {
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '.-.-.-': '.',
  '--..--': ',',
  '..--..': '?',
  '.----.': "'",
  '-.-.--': '!',
  '-..-.': '/',
  '-.--.': '(',
  '-.--.-': ')',
  '.-...': '&',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '.-.-.': '+',
  '-....-': '-',
  '..--.-': '_',
  '.-..-.': '"',
  '...-..-': '$',
  '.--.-.': '@',
  '/': ' ',
};

const CHAR_TO_MORSE = {
  'A': '.-', 
  'B': '-...', 
  'C': '-.-.', 
  'D': '-..', 
  'E': '.', 
  'F': '..-.', 
  'G': '--.', 
  'H': '....', 
  'I': '..', 
  'J': '.---', 
  'K': '-.-', 
  'L': '.-..', 
  'M': '--', 
  'N': '-.', 
  'O': '---', 
  'P': '.--.', 
  'Q': '--.-', 
  'R': '.-.', 
  'S': '...', 
  'T': '-', 
  'U': '..-', 
  'V': '...-', 
  'W': '.--', 
  'X': '-..-', 
  'Y': '-.--', 
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  ' ': '/',
};

/**
 * Takes a string of text and return a morse code string.
 * @param {String} text String containing text to convert into morse code
 */
function textToMorse(text) {
  if (text) {
    const upText = text.toUpperCase();
    
    const morseCodeList = [];

    for (let i = 0; i < upText.length; i += 1) {
      const currChar = upText.charAt(i);

      if (objectKeys(CHAR_TO_MORSE).includes(currChar)) {
        morseCodeList.push(CHAR_TO_MORSE[currChar]);
        morseCodeList.push(' ');
      }
    }

    morseCodeList.pop();

    let morseCodeString = '';

    morseCodeList.forEach((morseCode) => {
      morseCodeString += morseCode;
    });

    return morseCodeString;
  }

  return '';
}

/**
 * Takes a morse code string and return to string text.
 * @param {String} morseCodeString String containing morse code sequence
 */
function morseToText(morseCodeString) {

  if (morseCodeString) {
    const text = [];

    const morseWords = morseCodeString.split(' / ');

    for (let wordIndex = 0; wordIndex < morseWords.length; wordIndex += 1) {
      const morseLetter = morseWords[wordIndex].split(' ');

      for (let charIndex = 0; charIndex < morseLetter.length; charIndex += 1) {
        const morseCode = morseLetter[charIndex];

        if (objectKeys(MORSE_TO_CHAR).includes(morseCode)) {
          text.push(MORSE_TO_CHAR[morseCode]);
        } 
      }

      if (wordIndex !== morseWords.length - 1) {
        text.push(' ');
      }
    }

    let textString = '';

    text.forEach((char) => {
      textString += char;
    });

    return textString;
  }

  return '';
}
