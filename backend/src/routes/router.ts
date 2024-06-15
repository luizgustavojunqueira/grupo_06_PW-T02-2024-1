import express, { Application } from "express";

import user from "./user.routes";
import event from "./event.routes";

const router = (app: Application) => {
  app.use("/api", user, event);

};

export default router;
