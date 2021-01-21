<div align="center">
  <h1 align="center">Reaktor junior assignment backend
   🔙🔚</h1>
  
  <p align="center">
    Better than the legacy API. (i hope)
  </p>
</div>

## About the project

This backend function is to combine the data of both given legacy API's and to supply it efficently in a nice form to the frontend.

The backend syncs its data with the legacy API every 5 minutes, because the given legacy API's have a 5 minute internal cache.

This backend has been made using Typescript and Node.js.

## Demo

Here's link to a working demo of the whole project: https://reaktorchallengefrontend.herokuapp.com/

## Installation 🖋️

### Prerequisites

* npm and Node.js

You can install both from 
```
https://www.npmjs.com/get-npm
```

Enter these commands in to your terminal of choice.

### Step 1
Cloning the repo
```
git clone git@github.com:D3lux3/reaktorchallengebackend.git

cd reaktorchallengebackend
```

### Step 2
Installing dependecies and compiling typescript in to javascript. And launching the backend.
```
npm install

npm run build

cd build

npm start
```

### Step * (optional)
Installing dependecies and running backend in dev mode.
```
npm install

npm run dev
```

## Configuration
The project uses port **3002** by default. However you can modify the default port by creating a ".env" file in to the root folder and entering and saving it:

```
PORT=YOUR PORT HERE
```