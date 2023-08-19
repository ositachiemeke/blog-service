import express from "express";
import LOG from "./../library/Logging";

// routes
import userRoutes from "./../routes/Users";
import postRoutes from "./../routes/Posts";
import healthCheck from "./../routes/Health";
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from "swagger";

const createServer = () => {
  const app = express();

  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    LOG.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
      /** Log the res */
      LOG.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });


  /** Routes */
  app.use("/v1/users", userRoutes);
  app.use("/v1/posts", postRoutes);


  /** Health check */
  app.use("/health", healthCheck);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error("Not found");

    LOG.error(error);

    res.status(404).json({
      message: error.message
    });
  });

  return app;
};

export default createServer;
