# python-morse-translator

A web app translating text to morse code and vice versa. 

And also play morse code sequence.

## Usage
- Download the Dockerfile
- Build the image
```bash
docker build -t morse-code-web:latest .
```
- Make the container and run it
```bash
docker run -d --name morse_code_web_container -p 8080:80 morse-code-web
```
