import mongoose from "mongoose";
const db = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {

        console.log("connected to mongodb.");

    }).catch((error) => {
        console.log(error)
    })
};
export default db;
