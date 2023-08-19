import { Request, Response, NextFunction } from "express";
import LOG from "./../library/Logging";
import { CONFIG } from "./../config/config";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const requestHeader = req.headers["x-reliance-authorization"] as string;

  // assuming that the SHARED_SECRETS value is an array of string
  const SECRETS: string[] = JSON.parse(CONFIG.SHARED_SECRETS);

  if (SECRETS.indexOf(requestHeader) >= 0) {
    LOG.debug("REQUEST WAS AUTHORIZED");
    next();
  } else {
    LOG.warn("Unauthorized request received");
    res.status(403).json({ error: "Missing or incorrect x-reliance-authorization header" });
  }
};

export { isAuthorized };
