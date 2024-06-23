import mongoose from "mongoose";
const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }],

    messagess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }]
}, { timestamps: true });

export const Conversation = mongoose.model("Conversation", conversationModel)