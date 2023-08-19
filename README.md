# sample-ms

Demonstration Microservice for dealing with CRUD operations to DB.

Before jumping into coding check the `docs` folder to see how to start the project, run migration, etc

## Development

A docker-compose file has been provided for your convenience. For ease of development just run: `docker-compose up`
which will build the project, spin up a MySQL and server on [http://localhost:9000](http://localhost:9000).

It'll use a volume for the local directory, so if you update the code, it'll reflect after a few seconds. If you want to
run commands in the docker container do for example: `docker-compose exec sample npm run migrate:up`

## About this service

It is intended to be a template from which developers can develop their own simple CRUD-style microservices.

### Features of this code

- Typescript for better reference validation and type safety
- DB Migrations (mysql is assumed)
- Built in logging functionality
- Built in Open Telemetry
- Sample code for handling pagination in large GET requests

### Coming soon

- Dockerisation
- UUID4 id management

## Getting started

### Node

```
$ node --version
v16.13.2
```

The app has been tested with Node v16.3 It will probably work with older versions, but v16 is peferred as it has Long
Term Support (will consider moving to 18 at some point)

### MySql

For development you will also need a local instance of MySQL. (to run a dockerised version - there's a decent guide
here: https://hevodata.com/learn/docker-mysql/)

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

### Running the service locally in development mode

```
$ npm run dev

> sample-ms@1.0.0 dev
> nodemon

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,js,json
[nodemon] starting `ts-node -r tsconfig-paths/register ./src/app.ts`
{"level":"info","message":"Server is starting","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"\n+==================================================+\n| Application Name:   SAMPLE-MS                    |\n+==================================================+\n","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"Server is running on port 9090","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"Executing (default): SELECT 1+1 AS result","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'users' AND TABLE_SCHEMA = 'testing'","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"Executing (default): SHOW INDEX FROM `users`","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}
{"level":"info","message":"Connection has been established successfully.","service":"sample-ms","timestamp":"2023-06-01 10:42:22"}

```

## Features

### Health Endpoint

/health will report the status of the application and connectivity to the database.

```
{
    "status": "UP",
    "uptime": "4",
    "checks": {
        "db": "UP"
    }
}
```

In the event the DB connection fails, the service will show itself as still UP (to prevent Nomad/K8s going into restart
cycles) but will report the DB as down and will log errors.

```
{
    "status": "UP",
    "uptime": "74",
    "checks": {
        "db": "DOWN"
    }
}
```

### Pagination

When doing GETs on a collection it's important to provide pagination functions.

The sample in /src/controllers/UsersController.ts shows how to do this, so that a query to:

`curl --location 'localhost:9090/v1/users?limit=1&offset=0' \ --header 'x-reliance-authorization: secret1'`

will return the total number of users (matching the query, and will give the number of records specified in `limit`
starting from an `offset` count)

```
{
    "count": 5,
    "rows": [
        {
            "id": "0168d265-6d0d-4d60-9f9c-db4b4ba5da68",
            "name": "Delores Ortiz",
            "email": "delores.ortiz@example.com"
        }
    ]
}
```

### Authorization

The service has a built-in "shared secret" mechanism by which any calling application can identify itself.

The developer can control which individual routes are subject to this (for instance the `/health` endpoint will
generally not be subject to this).

To protect a specific route add the `isAuthorized` function to the function chain:

```
router.post("/", isAuthorized, controller.createUser);
```

This will now require requests to provide a header `x-reliance-authorization` containing a secret. The service can
service multiple such secrets defined in an environment variable `SHARED_SECRETS=["secret1", "secret2"]` meaning that
individual services that may call this microservice can be given unique secrets.

## Project Structure

To modify this project for your own service:

- `/database/migrations`: define your own table structures
- `/database/seeders`: set up any seed data you might need
- `/models`: Modify the Users.ts as appropriate to your service
- `/routes`: Modify the Users.ts as appropriate to your service
- `/types`: Modify the User.ts type as appropriate to your service

That's it! :)

## Preparing for PROD / STG

TBC
