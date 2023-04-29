FROM alpine
RUN apk add git python3 py3-pip ffmpeg
WORKDIR "/root"
RUN git clone -b flask --single-branch https://github.com/DuckOfTheBooBoo/node-python-morse-translator
WORKDIR "/root/node-python-morse-translator"
RUN pip install -r ./requirements.txt
RUN chmod +x ./start_servers.sh
EXPOSE 80
ENTRYPOINT ./start_servers.sh
