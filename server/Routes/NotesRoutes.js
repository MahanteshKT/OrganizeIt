import express from 'express';
import {
    CreateNote,
    GetAllUserNotes,
    AddUserLatestNotes,
    GetUserLatestNotes
} from '../controllers/NotesControllers.js';
import { VerifyToken } from './../middleware/AuthMiddleware.js';
const router = express.Router();

router.post('/create-note', VerifyToken, CreateNote);
router.post('/add-latest-notes', VerifyToken, AddUserLatestNotes);
router.get('/get-notes/:userId', VerifyToken, GetAllUserNotes);
router.get('/get-latest-notes/:userId',VerifyToken, GetUserLatestNotes);
export default router;