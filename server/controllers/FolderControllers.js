import Folder from "../models/FolderModel.js";
import User from "./../models/UserModel.js";

export const CreateFolder = async function (req, res) {
    try {
        const { userId, name , ...others} = req.body;
        if (!userId) {
            throw Error('Please Login to create Folder');
        } else if (!name) {
            throw Error('Folder Name Required');
        }
        const folderExists = await Folder.findOne({ name: name, userId });
        console.log(folderExists);
        if (folderExists) {
            throw Error('Folder Already Exists');
        }


        const folder = await Folder.create({
            userId, name, ...others
        });

        if (!folder) {
            throw Error('Folder Not Created');
        }
        console.log(folder);
        res.status(200).json({
            folder,
            message: 'Folder created successfully'
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const GetUserFolder = async function (req, res) {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw Error('user Not Exists');
        }
        const folders = await Folder.find({userId}).sort({ createdAt: -1 });
        if (!folders) {
            throw Error('folders not found');
        }
        res.status(200).json({
            folders
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const AddUserLatestFolder = async function (req, res) {
    try {
        const { folderId, userId } = req.body;
        if (!folderId) {
            throw Error('folder id not found');
        }
        await User.updateOne(
            { _id: userId },
            { $pull: { latestFolders: folderId } }
          );
          
        // Step 2: Add the folder at the beginning and limit to 5 entries
        const folder = await User.updateOne(
        { _id: userId },
        {
            $push: {
            latestFolders: {
                $each: [folderId],
                $position: 0,
                $slice: 5
            }
            }
        }
        );
        if (!folder) {
            throw Error('not Updated the value');
        }
        res.status(200).json({
            folder
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const GetUserLatestFolder = async function (req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw Error('user not found');
        }
        const latestFolders = user.latestFolders;
        res.status(200).json({
            latestFolders
        })
        
    } catch (err) {
        res.status(500).json(err.message);
    }
}