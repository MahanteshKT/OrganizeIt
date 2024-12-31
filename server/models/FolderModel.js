import mongoose from 'mongoose';


const FolderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    noteIdsList: [
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'notes', 
        },
      ],

},{
    timestamps: true
});

const Folder = mongoose.model('folders', FolderSchema);
export default Folder;