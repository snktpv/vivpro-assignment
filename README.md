# vivpro-assignment

## tech stack and specs
- python >= 3.9(make sure you have it installed along with virtualenv)
- fastapi
- node.js 18
- react
- Material UI
  
## How to install and start the project
- clone the repo into your local system and navigate to cloned project
- navigate to backend folder and create a python virtual env using command: **python -m venv vivpro-assignment**
- now activate the created venv using command: **source vivpro-assignment/bin/activate**
- run **pip install -r requirements.txt** to install all packages
- start the server using **fastapi dev server.py**
- now navigate to frontend folder and run **npm install** to install all packages
- run **npm start** to start frontend server
- application should be up and running on http://localhost:3000

## Feature covered within coding of around 3hrs
- Getting songs using pagination at backend and frontend both
- Get a song details using title
- Update rating for a song(couldnt add star rating within 3 hrs so have kept simple integer as of now)
- Download CSV for content shown on table for particular page
- sorting, filtering, hiding of columns
- Scatter chart for all songs danceability data(couldnt complete and other 2 charts got bit of understanding issue with the requiremnts)
- tests are yet to be added

## Further improvements areas for prod ready build
- Can use data fetching lib such as react-query to cache data when we move b/w pages
- Tests can be added
- Once data fetching lib such as react-query is used state management could be done better and moved out from useEffects
- Star rating can be added
