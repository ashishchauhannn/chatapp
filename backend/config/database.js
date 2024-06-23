import mongoose from "mongoose";
const db = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {


        console.log("database connected");

    }).catch((error) => {
        console.log(error)
    })
};
export default db;
