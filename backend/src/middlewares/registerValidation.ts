import { NextFunction, Response, Request } from "express";

export function registerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const { name, email } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Requires a name");
  }

  if (!email) {
    errors.push("Requires an email");
  } else if (!regex.test(email)) {
    errors.push("Invalid email");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return next();
}
