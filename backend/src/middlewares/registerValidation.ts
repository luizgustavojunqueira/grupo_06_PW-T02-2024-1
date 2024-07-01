import { NextFunction, Response, Request } from "express";

export function registerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Requires a name");
  }
  
  if (!password){
    errors.push("Requires a password");
  }

  if (!email) {
    errors.push("Requires an email");
  } else if (!regex.test(email)) {
    errors.push("Invalid email");
  }

  if (!password) {
    errors.push("Requires an password");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return next();
}
