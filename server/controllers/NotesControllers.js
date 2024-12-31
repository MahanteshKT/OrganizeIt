
import Note from './../models/NoteModel.js';
import User from './../models/UserModel.js';
export const CreateNote = async function (req, res) {
    try {
        const { title, description , ...others} = req.body;
        if (!title) {
            throw Error("title required to create and note");
        }
        const note = await Note.create({
            title,
            description,
            ...others
        });
        if (!note) {
            throw Error("Notes Not Created Successfully");
        }
        res.status(200).json({
            note
        });
    } catch(err) {
        res.status(500).json(err.message);
    }
};

export const GetAllUserNotes = async function (req, res) {
    try {
        const { userId } = req.params;
        console.log(req.params);
        if (!userId) {
            throw Error('userId is required please provide');
        }
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        if (!notes) {
            throw Error('no notes found');
        }
        res.status(200).json({
            notes
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const AddUserLatestNotes = async function (req, res) {
    try {
        const { noteId, userId } = req.body;
        if (!noteId) {
            throw Error('folder id not found');
        }
        await User.updateOne(
            { _id: userId },
            { $pull: { latestNotes: noteId } }
        );
          
        // Step 2: Add the folder at the beginning and limit to 5 entries
        const notesUpdated = await User.updateOne(
        { _id: userId },
        {
            $push: {
            latestNotes: {
                $each: [noteId],
                $position: 0,
                $slice: 5
            }
            }
        }
        );
        if (!notesUpdated || !notesUpdated.acknowledged) {
            throw Error('not Updated the value');
        }
        res.status(200).json({
            notesUpdated
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const GetUserLatestNotes = async function (req, res) {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw Error('user not found');
        }
        const latestNotes = user.latestNotes;
        res.status(200).json({
            latestNotes
        })
        
    } catch (err) {
        res.status(500).json(err.message);
    }
}
