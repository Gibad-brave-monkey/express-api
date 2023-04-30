import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./users/users.js";

const PORT = 8080;
const app = express();

app.get("/hello", (req, res) => {
  return res.send({ success: true });
});

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

app.listen(PORT, () => {
  console.log("Server Started");
});
