# react_app

### Step 1

For the initial commit, I have created a simple ReactJs app using <code>create-react-app</code> from Facebook.
I also created a python Starlette API which is consumed by the fronted, displaying a simple message from the backend. ("Hello Andrei from backend")


### Step 2

For this step, I have created a PostegreSQL db and inserted the raw data. The backend is now fetching data directly from the DB and then sends it to the Frontend in json format. 5 different hard-coded gifs are mapped to the the data which is now displayed in the UI .


### Step 3
In progress...
- Working on the frontend side to be able to change the position of the cards

For this step we are talking about refining the UI and adding the extra-needed features.


### Step 4

Containerize the entire system using Docker and docker-compose.
- Created 3 different containers for: backend, frontend, postgres-db.
- defined the start-up order of the db and backend container using an open-source script (source: https://docs.docker.com/compose/startup-order/)


