# sample-ms

Demonstration for dealing with CRUD operations to DB.



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
```

