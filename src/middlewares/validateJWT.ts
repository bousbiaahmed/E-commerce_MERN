import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import {ExtendRequest} from "../types/extendedRequest"


const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Token was not provided");
    return;
  }

  jwt.verify(
    token,
    "VEUj5m7V7m4mi2dz48mJCoSsgm0z3qVq",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid token");
        return;
      }
      if (!payload) {
        res.status(403).send("Invalid token payload");
        return;
      }

      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
