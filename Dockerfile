FROM alpine
RUN apk add nodejs git npm python3 py3-pip ffmpeg bash
WORKDIR "/root"
RUN git clone https://github.com/DuckOfTheBooBoo/node-python-morse-translator
WORKDIR "/root/node-python-morse-translator"
RUN python3 -m pip install --break-system-packages -r ./requirements.txt
RUN npm i .
# RUN chmod +x ./start_servers.sh
EXPOSE 80
ENTRYPOINT ["npm", "run", "start"]
