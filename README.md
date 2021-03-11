# react_app

### Step 1

For the initial commit, I have created a simple ReactJs app using <code>create-react-app</code> from Facebook.
I also created a python Starlette API which is consumed by the fronted, displaying a simple message from the backend. ("Hello Andrei from backend")


### Step 2

For this step, I have created a PostegreSQL db and inserted the raw data. The backend is now fetching data directly from the DB and then sends it to the Frontend in json format. 5 different hard-coded gifs are mapped to the the data which is now displayed in the UI .


### Step 3

**App** component is a class based component that contains:
  - **SaveButton** component:
    - functional component using React Hooks
    - has a fade animation to give feedback to the user that the button has been pressed
    - sends a POST request to the server with the re arranged cards.
  - **ImageList** component:
    - functional component using React Hooks
    - contains **Image** component:
      - uses a hook for drag-n-drop 
      - another hook for the placeholder spinner that is displayed while the gif is loading
  - **ReactModal** component:
    - onClick event that opens the gif in the centre of the screen
    - closes on ESC



### Step 4

Containerize the entire system using Docker and docker-compose.
- Created 3 different containers for: backend, frontend, postgres-db.
- defined the start-up order of the db and backend container using an open-source script (source: https://docs.docker.com/compose/startup-order/)


