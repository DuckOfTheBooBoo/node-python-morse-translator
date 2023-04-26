// eslint-disable-next-line import/no-extraneous-dependencies
import * as Tone from 'tone';

const FREQUENCY = 500;

// DOT = Sine(500).to_audio_segment(duration=50)
// DASH = Sine(500).to_audio_segment(duration=150)
// INTRA_CHAR_SPACE = AudioSegment.silent(duration=50)
// INTER_CHAR_SPACE = AudioSegment.silent(duration=150)
// WORD_SPACE = AudioSegment.silent(duration=350)

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
