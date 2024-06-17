import { NextFunction, Response, Request } from "express";

import moment from "moment";
import { UserRequest } from "../interfaces/UserRequest";

export function eventCreateValidation(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  moment.locale("pt-br");
  const { title, initDate, endDate, userEmail } = req.body;

  const errors = [];

  if (!title) {
    errors.push("Requires a title");
  }

  if (!initDate) {
    req.body.initDate = moment().format();
  } else {
    req.body.initDate = moment(initDate).format();
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (!endDate) {
    req.body.endDate = moment(initDate).add(1, "hours").format();
  } else {
    req.body.endDate = moment(endDate).format();
  }

  return next();
}
