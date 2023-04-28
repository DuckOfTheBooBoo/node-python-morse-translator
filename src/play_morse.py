from time import sleep
from pydub import AudioSegment
from pydub.generators import Sine
import os, typing

DOT = Sine(500).to_audio_segment(duration=50)
DASH = Sine(500).to_audio_segment(duration=150)
INTRA_CHAR_SPACE = AudioSegment.silent(duration=50)
INTER_CHAR_SPACE = AudioSegment.silent(duration=150)
WORD_SPACE = AudioSegment.silent(duration=350)

def play_morse(morse_code: str) -> AudioSegment:
    
    if morse_code:
        morse_audio = AudioSegment.empty()

        audio_segment_visual = []

        if " / " in morse_code:
            sequences = morse_code.split(" / ")
        else:
            sequences = [morse_code,]

        for word_index, word in enumerate(sequences):
            letters = word.split(" ")

            for char in letters:
                for symbol_index, symbol in enumerate(char):
                    
                    if symbol == ".":
                        morse_audio += DOT
                        audio_segment_visual.append("DOT")
                    elif symbol == "-":
                        morse_audio += DASH
                        audio_segment_visual.append("DASH")
                    
                    if symbol_index != len(char) - 1:
                        # Add silence between characters
                        morse_audio += INTRA_CHAR_SPACE
                        audio_segment_visual.append("INTRA_CHAR_SPACE")
                    else:
                        # Add silence between letters
                        morse_audio += INTER_CHAR_SPACE
                        audio_segment_visual.append("INTER_CHAR_SPACE")
            
            if word_index != len(sequences) - 1:
                # Add silence between words
                morse_audio += WORD_SPACE   
                audio_segment_visual.append("WORD_SPACE")

        return morse_audio.export(format="mp3").read()
    
    else:
        pass

if __name__ == "__main__": ...
