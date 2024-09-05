# Server for the Collaboration Project

## How to run this server locally

### Set up using manual Method

1. First either download this repo or Clone it locally ( btw I prefer cloning the repo )
2. cd into the repo ( make sure you are in the `collaboration-server` repo )
3. run `npm install`
4. run `npm run server`
5. Congrats! You socket server is running on PORT `8080`

### Set up using Docker

> Note: Please make sure you have Docker installed and running on your machine.

1. First either download this repo or Clone it locally.
2. cd into the repo ( make sure you are in the `collaboration-server` repo )
3. run `docker build -t collaboration-server .` in the root folder.
4. Once the build process is completed, run `docker-compose up` in the root folder.
5. Congrats! You socket server is running on PORT `8080`
