import { NextFunction, Request, Response } from "express";
import LOG from "./../library/Logging";
import UserFactory from "./factories/User.factory";

interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const response = await UserFactory.createUser(body);
    return res.status(201).json({
      success: true, message: "User created successfully", data: {
        id: response.id
      }
    });
  } catch (err) {
    // Not safe to log the full error as this would contain PII, so need to go carefully
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "Problem inserting user, was everything unique that needed to be?" });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserFactory.login(req.body);
    if (!response) {
      return res.status(401).json({ success: "false", message: "Invalid username/email and password" });
    }

    return res.status(200).json({ success: "true", message: "Login successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred while logging in" });
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserFactory.updateUser(req.body, req.user.id);
    if (!response) {
      return res.status(404).json({ success: "false", message: "user not found" });
    }

    return res.status(200).json({ success: "true", message: "Update successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred while logging in" });
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserFactory.deleteUser(req.user.id);
    if (!response) {
      return res.status(404).json({ success: "false", message: "user not found" });
    }

    return res.status(200).json({ success: "true", message: "User deleted successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred while logging in" });
  }
}





const getUserBasedOnId = async (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.params.userId;

  // try {
  //   const result = await DB.users.findByPk(userId);

  //   if (result) {
  //     return res.status(200).json({ user: result });
  //   } else {
  //     return res.status(404).json({ message: "user not found" });
  //   }
  // } catch (err) {
  //   return res.status(500).json({});
  // }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // let queryObj = {};
  // if (req.query.limit) {
  //   let limit: number = parseInt(req.query.limit.toString());
  //   Object.assign(queryObj, { limit: limit });
  // }

  // if (req.query.offset) {
  //   let offset: number = parseInt(req.query.offset.toString());
  //   Object.assign(queryObj, { offset: offset });
  // }

  // try {
  //   const result = await DB.users.findAndCountAll(queryObj);

  //   return res.status(200).json(result);
  // } catch (err) {
  //   return res.status(500).json({ message: "DB error performing query to get users" });
  // }
};

export default { createUser, getUserBasedOnId, getAllUsers, loginUser, updateUser, deleteUser };
