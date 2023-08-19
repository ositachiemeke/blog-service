import { NextFunction, Request, Response } from "express";
import LOG from "../library/Logging";
import UserFactory from "./factories/User.factory";
import PostFactory from "./factories/Post.factory";

interface User {
  id: string;
  name: string;
  email: string;
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = { ...req.body, user_id: req.user.id };

    const response = await PostFactory.create(body);
    return res.status(201).json({
      success: true, message: "Post created successfully", data: {
        response
      }
    });
  } catch (err) {
    // Not safe to log the full error as this would contain PII, so need to go carefully
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "Problem inserting user, was everything unique that needed to be?" });
  }
};



const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await PostFactory.update({ ...req.body, post_id: req.params.id }, req.user.id);
    if (!response) {
      return res.status(404).json({ success: "false", message: "post not found" });
    }

    return res.status(200).json({ success: "true", message: "Update successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred while logging in" });
  }
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await PostFactory.delete(req.user.id, parseInt(req.params.postId));
    if (!response) {
      return res.status(404).json({ success: "false", message: "Post not found" });
    }

    return res.status(200).json({ success: "true", message: "Post deleted successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred while logging in" });
  }
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await PostFactory.getAll();
    if (!response) {
      return res.status(404).json({ success: "false", message: "Post not found" });
    }

    return res.status(200).json({ success: "true", message: "Retrieved  successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred." });
  }
}

const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await PostFactory.getPostById(parseInt(req.params.postId));
    if (!response) {
      return res.status(404).json({ success: "false", message: "Post not found" });
    }

    return res.status(200).json({ success: "true", message: "Retrieved  successful", data: response });

  } catch (err) {
    console.log(err, "error")
    if (err instanceof Error) LOG.error(err.name);
    return res.status(500).json({ success: "false", message: "An error occurred." });
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

export default { createPost, getUserBasedOnId, getAllUsers, updatePost, deletePost, getPosts, getSinglePost };
