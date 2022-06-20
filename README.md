# Mock Server

This repo contains sample Node.js mock server

## Get started

### Installation
```sh
git clone git@github.com:sandragolden/mock-server-express.git
cd mock-server-express
npm install
```

### Setup Your .env File
- Rename the example file [sample.env](sample.env) to `.env` in the root of the repository:
```sh
cp sample.env .env
```

- Open the `.env` file and edit the following information.

```
######################################################################
# Configuration Properties
######################################################################
PORT=3010
SERVER_URL=http://localhost:${PORT}
ACCESS_TOKEN_SECRET=NLzYNimPWXfgJezWCGmifkNqTZx2NBJqUBWJxchnrHsWd
REFRESH_TOKEN_SECRET=E4mGpWJ6i2MpysMCyg64zfphqR7qLowUcRDqRrLn6AfPb
USERNAME=admin
PASSWORD=iw8qeJmtUx4ibrf6HoWfdqfB2
```
The following table describes each of the .env file variables that are leveraged.
| Property Name             | Description                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------|
| PORT                      | Server Port (ex: `3010`)                                                                            |
| SERVER_URL                | The server endpoint (ex: `http://localhost:${PORT}` or `https://your-app-name.herokuapp.com`        |
| ACCESS_TOKEN_SECRET       | Secret used to sign the access token JWT                                                            |
| REFRESH_TOKEN_SECRET      | Secret used to sign the refresh token JWT                                                           |
| USERNAME                  | Username to access the service via BASIC Auth                                                       |
| PASSWORD                  | Password to access the service via BASIC Auth                                                       |

### Run the server
```sh
npm start

# output: The mock API is running on: http://localhost:3010/posts.
```

## Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Postman Collection
Sample Postman collection attached [here](./postman).
