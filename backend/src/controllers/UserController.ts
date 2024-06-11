import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export class Controller {
  async register(req: Request, res: Response) {
    try {
      console.log("UAU");
      const prisma = new PrismaClient();


      const newUser = req.body;

      console.log("teste");

      console.log(newUser);

      const user = await prisma.user.create({
        data: { ...newUser, password: await bcrypt.hash(newUser.password, 10) },
      });

      console.log("UAU2");
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response) {
    const prisma = new PrismaClient();

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
        { expiresIn: "15m" }
      );

      res.cookie("token", jwt);
      res.json({ message: "Logged in!" });
    } else {
      res.status(401).send("Invalid credentials!");
    }
  }

  async deleteUser(req: UserRequest, res: Response) {
    try {
      const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    const usersWithoutPassword = users.map((user) => {
      return { ...user, password: undefined };
    });

    return res.json(usersWithoutPassword);
  }
}

export const UserController = new Controller();
