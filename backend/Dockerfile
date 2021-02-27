FROM tiangolo/uvicorn-gunicorn:python3.7

COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# netcat is needed to run ./wait-for-postgres.sh 
RUN apt-get -q update && apt-get -qy install netcat

