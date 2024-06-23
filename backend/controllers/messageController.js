import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;// params are use to fetch id
        const { message } = req.body;
        let gotConvo = await Conversation.findOne({  // from the models
            participants: { $all: [senderId, receiverId] }
        });

        if (!gotConvo) {
            gotConvo = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };
        const newMessage = await Message.create({     // from the models
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            gotConvo.messagess.push(newMessage._id);
        }
        await gotConvo.save();
        return res.status(201).json({ mesage: "Mesaage send successfully." })

    }
    catch (error) {
        console.log(error)
    }
}
///


export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;// params are use to fetch id
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messagess")
        return res.status(200).json(conversation?.messagess)
    } catch (error) {
        console.log(error)

    }
}
