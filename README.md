# sample-ms

Demonstration Microservice for dealing with CRUD operations to DB.


## Development

A docker-compose file has been provided for your convenience. For ease of development just run: `docker-compose up`
which will build the project, spin up a MySQL and server on [http://localhost:9000](http://localhost:9000).

It'll use a volume for the local directory, so if you update the code, it'll reflect after a few seconds. If you want to
run commands in the docker container do for example: `docker-compose exec sample npm run migrate:up`

## About this service

It is intended to be a template from which developers can develop their own simple CRUD-style microservices.


## Getting started

### Node

```
$ node --version
v16.13.2
```

### Environment Variables

At the root level of your project you can create a local .env file (there's an .env.example you can copy). Your file
will look something like:

```
NODE_ENV="development" # development only for local development or production
DB_HOST="localhost"
DB_PORT="3306"
DB_USERNAME="root"
DB_PASSWORD="secret"
DB_DATABASE="testing"
LOG_LEVEL="debug"
SERVER_PORT="9090"
SERVICE_NAME="sample-ms"  # How it will appear in Open Telemetry and logs
SHARED_SECRETS=["secret1", "secret2"]   # x-reliance-authorization headers
```

### Pull down dependencies

```
$ npm install
```

