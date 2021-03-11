# react_app

### Step 1

For the initial commit, I have created a simple ReactJs app using <code>create-react-app</code> from Facebook.
I also created a python Starlette API which is consumed by the fronted, displaying a simple message from the backend. ("Hello Andrei from backend")


### Step 2

For this step, I have created a PostegreSQL db and inserted the initial data on server start-up. The backend is now fetching data directly from the DB and then sends it to the Frontend in json format.

### Step 3

Design and implement the front-end.
   - loads the content recieved as Json from the back-end as 5 cards.
   - assigns a gif image for every type of card (3 different types).
   - re order the cards and save the new order into the PostgresDB such as the new order is displayed when the page reloads.

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

Created a <code>docker-compose</code> file to start all the components as microservices: 
- Created 3 different containers for: backend, frontend, postgres-db.
- defined the start-up order of the db and backend container using an open-source script (source: https://docs.docker.com/compose/startup-order/)
- use <code> docker-compose up --build </code> to start and build the containers


