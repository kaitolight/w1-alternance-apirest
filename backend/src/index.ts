import express from "express";
import cors from "cors";
import dataSource from "./db";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api", router);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server listening on port 5000"));
};

void start();
