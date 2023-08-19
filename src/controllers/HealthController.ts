import { NextFunction, Request, Response } from "express";
import DB from "../models";
import LOG from "../library/Logging";

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [results, metadata] = await DB.raw.query("SELECT 1+1 AS RESULT;");
    return res.status(200).json({
      status: "UP",
      uptime: process.uptime(),
      checks: {
        db: "UP"
      }
    });
  } catch (err) {
    LOG.error(err);
    return res.status(200).json({
      status: "UP",
      uptime: process.uptime().toFixed(0),
      checks: {
        db: "DOWN"
      }
    });
  }
};

export default { healthCheck };
