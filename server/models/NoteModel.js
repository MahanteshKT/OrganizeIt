import mongoose from 'mongoose';


const NoteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            unique: false,
            require: true
        },
        description: {
            type: String
        },
        bgColor: {
            type: String,
        },
        images: {
            type: [String],
        }
    }, { timestamps: true });

const Note = mongoose.model("notes", NoteSchema);

export default Note;