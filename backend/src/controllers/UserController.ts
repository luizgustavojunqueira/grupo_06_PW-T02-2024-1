import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const prisma = new PrismaClient();

export class Controller {
  async register(req: Request, res: Response) {
    try {

      const newUser = req.body;

      const user = await prisma.user.create({
        data: { ...newUser, password: await bcrypt.hash(newUser.password, 10) },
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response) {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user == null) {
      res.status(404).json({ message: "User not found!" });
    } else if (await bcrypt.compare(password, user.password)) {
      const jwt = jsonwebtoken.sign(
        { user: { ...user, password: undefined } },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      let expireDate = new Date(Date.now() + 1000 * 60 * 60)
      res.cookie("token", jwt, { expires: expireDate, httpOnly: false });
      res.json({ message: "Logged in!" });
    } else {
      res.status(401).send("Invalid credentials!");
    }
  }

  async deleteUser(req: UserRequest, res: Response) {
    try {

      const email = req.headers.user?.email;

      if (email) {
        const events = await prisma.event.deleteMany({
          where: { userEmail: email },
        });

        const user = await prisma.user.delete({
          where: { email: email },
        });

        res.cookie("token", "");
        return res.json({ user: { ...user, password: undefined }, events: events });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getUsers(req: Request, res: Response) {

    const users = await prisma.user.findMany();

    const usersWithoutPassword = users.map((user) => {
      return { ...user, password: undefined };
    });

    return res.json(usersWithoutPassword);
  }
}

export const UserController = new Controller();
