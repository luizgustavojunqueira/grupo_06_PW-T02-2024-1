import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";

import moment from "moment";

export class Controller {
	async createEvent(req: Request, res: Response) {
		try {
			const prisma = new PrismaClient();

			const newEvent = req.body;

			const event = await prisma.event.create({
				data: newEvent,
			});

			return res.json(event);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	async getUserEvents(req: UserRequest, res: Response) {
		try {
			const prisma = new PrismaClient();

			const userEmail = req.headers.user?.email;

			if (userEmail) {
				const events = await prisma.event.findMany({
					where: { userEmail: userEmail },
				});

				return res.json(events);
			} else {
				return res.status(400).json({ message: "User not found!" });
			}
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

	async updateEvent(req: UserRequest, res: Response) {
		try {
			const prisma = new PrismaClient();
			const eventId = req.params.id;
			const updatedEvent = req.body;

            updatedEvent.userEmail = req.headers.user?.email;

			const event = await prisma.event.update({
				where: { id: Number(eventId) },
				data: updatedEvent,
			});

			return res.json(event);
		} catch (error) {
			return res.status(500).json({ message: error });
		}
	}

    async deleteEvent(req: UserRequest, res: Response) {
        try {
            const prisma = new PrismaClient();
            const eventId = req.params.id;

            const eventEmail = await prisma.event.findUnique({
                where: { id: Number(eventId) },
                select: { userEmail: true },
            });

            if(eventEmail?.userEmail !== req.headers.user?.email) {
                return res.status(400).json({ message: "Cannot delete another user's event" });
            }

            await prisma.event.delete({
                where: { id: Number(eventId) },
            });

            return res.json({ message: "Event deleted" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async getEventById(req: Request, res: Response) {
        try {
            const prisma = new PrismaClient();
            const eventId = req.params.id;

            const event = await prisma.event.findUnique({
                where: { id: Number(eventId) },
            });

            return res.json(event);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export const EventController = new Controller();
