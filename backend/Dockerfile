  
FROM python:3.9

RUN mkdir /app
WORKDIR /app

RUN apt update && \
    apt install -y postgresql-client && \
    apt install -y cmake

COPY requirements.txt ./
RUN pip cache purge && pip install --no-cache-dir --default-timeout=1200 -r requirements.txt

COPY . .