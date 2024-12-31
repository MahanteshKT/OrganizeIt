import { VerifyToken } from '../middleware/AuthMiddleware.js';
import {
    CreateFolder,
    GetUserFolder,
    AddUserLatestFolder,
    GetUserLatestFolder
} from './../controllers/FolderControllers.js';
import express from 'express';

const router = express.Router();

router.post('/create-folder', VerifyToken, CreateFolder);
router.get('/get-folders/:userId', VerifyToken, GetUserFolder);
router.post('/add-latest-folder', VerifyToken, AddUserLatestFolder)
router.get('/get-latest-folders/:userId', VerifyToken, GetUserLatestFolder);
export default router;