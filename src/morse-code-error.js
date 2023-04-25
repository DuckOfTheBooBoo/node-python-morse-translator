/* eslint-disable max-classes-per-file */
/**
 * Error for when the corresponding morse code symbol is not found in MORSE_TO_CHAR object.
 */
class MorseCodeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MorseCodeError';
  }
}

/**
 * Error for when the corresponding character in text is not found in the CHAR_TO_MORSE object.
 */
class MorseCodeNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'MorseCodeNotFound';
  }
}

module.exports = {
  MorseCodeError,
  MorseCodeNotFound,
};
