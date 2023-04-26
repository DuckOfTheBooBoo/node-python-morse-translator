/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as Tone from './tone.js';

const FREQUENCY = 500;

function playDot() {
  const osc = new Tone.Oscillator(FREQUENCY, 'sine').toDestination();
  osc.start().stop(`+${0.05}`);
}

function playDash() {
  const osc = new Tone.Oscillator(FREQUENCY, 'sine').toDestination();
  osc.start().stop(`+${0.150}`);
}

function intraCharSpace() {
  const silence = new Tone.Signal(0).toDestination();
  silence.start();
  Tone.Transport.scheduleOnce(() => {
    silence.stop();
  }, `+${0.05}`);
}

function interCharSpace() {
  const silence = new Tone.Signal(0).toDestination();
  silence.start();
  Tone.Transport.scheduleOnce(() => {
    silence.stop();
  }, `+${0.150}`);
}

function wordSpace() {
  const silence = new Tone.Signal(0).toDestination();
  silence.start();
  Tone.Transport.scheduleOnce(() => {
    silence.stop();
  }, `+${0.350}`);
}

/**
 * 
 * @param {String} morseCodeString 
 */
function generateMorseTone(morseCodeString) {

  for (let symbolIndex = 0; symbolIndex < morseCodeString.length; symbolIndex += 1) {
    const currSymbol = morseCodeString.charAt(symbolIndex);
  }
}

export {
  playDot,
  playDash,
};
