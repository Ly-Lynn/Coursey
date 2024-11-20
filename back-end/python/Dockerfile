FROM python:3.12.6

RUN apt-get update && apt-get install -y --no-install-recommends gcc

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install -U https://github.com/coletdjnz/yt-dlp-youtube-oauth2/archive/refs/heads/master.zip



EXPOSE 8002
# CMD ["ls", "/app"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002", "--reload"]