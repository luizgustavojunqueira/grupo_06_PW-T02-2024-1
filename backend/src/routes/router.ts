import express, { Application } from "express";

const router = (app: Application) => {
  app.get("/", (req, res) => {
    res.json({ message: "Calendário" });
  });
};

export default router;