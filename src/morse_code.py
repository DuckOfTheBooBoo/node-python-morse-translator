from morse_code_error import MorseCodeError, MorseCodeNotFound

MORSE_TO_CHAR_DICT = {
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
    '/': ' '
}

CHAR_TO_MORSE_DICT = {
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
    ' ': '/'
}

def text_to_morse(text):

    """
    Takes a string of text and return a morse code string.
    """

    if text:

        if any(ch.islower()for ch in text):
            text = text.upper()

        morse_code_list = []

        words = text.split(" ")

        for char in text:
            if char in CHAR_TO_MORSE_DICT.keys():
                morse_code_list.append(CHAR_TO_MORSE_DICT[char])
                morse_code_list.append(" ")
            
            else:
                raise MorseCodeNotFound(f"INVALID CHAR: {char}")

        # Remove trailing whitespace
        morse_code_list.pop()

        morse_code_str = ''.join(morse_code_list)

        return morse_code_str

    # Return empty string if text is empty
    return ""

def morse_to_text(morse_code_str):

    """
    Takes a morse code string and return to string text.
    """

    if morse_code_str:
        text = []

        morse_words = morse_code_str.split(" / ")


        for idx, morse_word in enumerate(morse_words):

            morse_letter = morse_word.split(" ")
            for morse_code in morse_letter:

                if morse_code in MORSE_TO_CHAR_DICT.keys():
                    text.append(MORSE_TO_CHAR_DICT[morse_code])
                
                elif morse_code == "":
                    continue
                
                else:
                    raise MorseCodeError(f"INVALID MORSE CODE: {morse_code}")

                
            if idx != len(morse_words) - 1:
                text.append(" ")
            
        return ''.join(text)

    else:
        return ""
