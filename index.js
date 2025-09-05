import express from 'express';
import mongoose from 'mongoose';
import photoRouter from "./router/photo.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const connectDb =async ()=>{
    try {
        await mongoose.connect("mongodb+srv://Jas-13:123@jasper.cclnzjl.mongodb.net/newtask")
        console.log("db connected")
    } catch (error) {
        console.log("filaed to connect db "+error.message)
    }
}

connectDb()

app.use("/api/photo", photoRouter)

app.listen(5000,()=>{
    console.log("server running on 5000")
})