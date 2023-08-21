import createServer from "./src/utils/server";
import serverless from "serverless-http";



export const handler = serverless(createServer());
