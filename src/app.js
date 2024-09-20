import express from "express";
import userRouter from "./routes/users.js";
import bookRouter from "./routes/book.js";
import asignaturesRouter from "./routes/asignature.js";
import courseRouter from "./routes/course.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/books", bookRouter);
app.use("/api/asignatures", asignaturesRouter);
//EJEMPLO
//app.use("/api/products", productsRouter);
