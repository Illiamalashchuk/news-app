# News App

The application use 3 open APIs

- NewsAPI
- NewsData.IO
- The New York Times API

The API keys are stored in .env files. The key should start with VITE\_{YOUR_NAME}

# Dev mode

1 - npm install
2 - npm run dev # Hot reload mode. The app is available on localhost:5173

# Build

1 - npm install
2 - npm run build # The result is in /dist

# Run via Docker

1 - docker build -t {YOUR_NAME} # You can --no-cache param to skip cache to rebuild
2 - docker run -p 5173:5173 -d {YOUR_NAME} # {YOUR_NAME} - same name of built image

The app is available on localhost:5173

To stop container

1 - docker ps # in column CONTAINER ID copy the value
2 - docker container stop {COPIED_CONTAINER_ID}
