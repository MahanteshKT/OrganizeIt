import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import { Register } from "./controllers/AuthControllers.js";
import NotesRoutes from "./Routes/NotesRoutes.js";
import FolderRoutes from "./Routes/FolderRoutes.js";
// import TransactionsRoutes from "./Routes/TransactionsRoutes.js";
import HomeRoutes from './Routes/HomeRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
//connection to mongoose and listening on server port
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error occurred while connecting to MongoDB:");
    console.error(error);
  });
  

// //middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// //routes with files
app.post("/auth/register", upload.single("picturePath"), Register);
// // app.routes("/book/post",Ver)

// /* Routes */
app.use('/', HomeRoutes);
app.use("/auth", AuthRoutes);
app.use("/note", NotesRoutes);
app.use("/folder", FolderRoutes);
// app.use("/transactions", TransactionsRoutes);
console.log('hello world');
