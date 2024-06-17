import { NextFunction, Response } from "express";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { JwtPayload } from "../interfaces/JwtPayload";
import { UserRequest } from "../interfaces/UserRequest";

export function validateToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  console.log(req.cookies.token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acess denied. No token provided!" });
  }

  try {
    const payload = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;

    req.headers["user"] = payload.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
}
