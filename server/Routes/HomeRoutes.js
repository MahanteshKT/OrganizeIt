import express from "express";
import {
    Home
} from './../controllers/HomeControllers.js';
const router = express.Router();

router.get('/home', Home);

export default router;
