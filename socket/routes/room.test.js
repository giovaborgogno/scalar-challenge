const request = require("supertest");
const express = require("express");
const roomsRouter = require("./roomRoutes");

const app = express();
app.use("/rooms", roomsRouter);

describe("GET /rooms", () => {
    it("should return an array of rooms with a 200 status code and the correct format for each room", async () => {
        const response = await request(app).get("/rooms");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
                title: "Last Premiere's Chat",
                id: "1",
            },
        ]);
        response.body.forEach((room) => {
            expect(room).toHaveProperty("title");
            expect(room).toHaveProperty("id");
        });
    });
});
