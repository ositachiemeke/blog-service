import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserFactory from "src/controllers/factories/User.factory";
import UserRepositories from "src/controllers/repositories/User.repository";
import { UserAuthInterface } from "src/types/User";



export const auth = () => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer") || !process.env.SECRET_JWT) {
                return res.status(401).send({ type: "error", status: 401, message: "unauthorized" });
            }

            const token = authHeader?.replace("Bearer ", "") || "";
            const secretKey = process.env.SECRET_JWT;
            const decoded = jwt.verify(token, secretKey) as UserAuthInterface;
            req.user = decoded;
            const response = await UserRepositories.findOneColName("id", req.user.id);
            if (!response) {
                return res.status(404).send({ type: "error", status: 404, message: "user not found" });
            }
            next();
        } catch (e) {
            console.log(e, "error")
            res.status(401).send({ type: "error", status: 401, message: "unauthorized" });
        }
    }
}
