import mongoose from "mongoose";
import Photo from "../model/photo.js";


export const createPhoto = async (req, res) => {
    let body = req.body;
    console.log(req.file)
    try {

        let field = ["name", "description", "mime_type", "width", "height"];


        let invalidField = field.filter(x => !body[x])

        if (invalidField.length !== 0) {
            return res.status(400).json({ message: "Please enter required fields " + invalidField, success: false })
        }

        let { name, description, mime_type, width, height, photo } = body
        photo = req.files.length !== 0 ? req.files[0].path : ""
        mime_type = mime_type.toUpperCase()

        let validMime = ["JPEG", "JPG", "PNG"]
        if (!validMime.includes(mime_type)) {
            return res.status(400).json({ message: `Please enter vaild mime_type valid value are (${validMime})`, success: false })
        }

        let create = await Photo.create({
            name,
            description,
            mime_type: mime_type,
            media_metadata: {
                width,
                height,
                photo
            }
        })

        return res.status(201).json({ message: "photo create successfully", data: create, sucess: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}

export const updatePhoto = async (req, res) => {
    let body = req.body;
    try {

        let field = ["name", "description", "mime_type", "width", "height", "photo"];

        let invalidField = field.filter(x => body[x])
        console.log(invalidField.length)


        if (invalidField.length === 0) {
            return res.status(400).json({ message: "Please enter any one field to update " + field, success: false })
        }

        let { id, name, description, mime_type, width, height, photo } = body
        if (!id) {
            return res.status(400).json({ message: `Please enter id`, success: false })
        }

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({ message: `Please enter valid id`, success: false })
        }

        
        if (mime_type) {
            let validMime = ["JPEG", "JPG", "PNG"]
            if (!validMime.includes(mime_type)) {
                return res.status(400).json({ message: `Please enter vaild mime_type valid value are (${validMime})`, success: false })
            }
        }
        
        let checkPhoto  = await Photo.findById(id);
        
        if(!checkPhoto){
            return res.status(404).json({ message: `photo id is not found in db`, success: false })
        }

        let update = await Photo.updateOne({ _id: id }, req.body, { new: true })

        return res.status(200).json({ message: "photo update successfully", sucess: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

export const deletePhoto = async (req, res) => {

    let body = req.body
    try {

        let { id } = body
        if (!id) {
            return res.status(400).json({ message: `Please enter id`, success: false })
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: `Please enter valid id`, success: false })
        }

        let checkPhoto  = await Photo.findById(id);
        
        if(!checkPhoto){
            return res.status(404).json({ message: `photo id is not found in db or already deleted`, success: false })
        }

        let deletePhoto = await Photo.findByIdAndDelete({_id:id})
        
        return res.status(200).json({ message: "photo deleted successfully", sucess: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}

export const GetPhotoByID = async (req, res) => {

    let id = req.params.id
    try {

        if (!id) {
            return res.status(400).json({ message: `Please enter id`, success: false })
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: `Please enter valid id`, success: false })
        }

        let checkPhoto  = await Photo.findById(id);
        
        if(!checkPhoto){
            return res.status(404).json({ message: `photo id is not found in db or already deleted`, success: false })
        }


        return res.status(200).json({ message: "photo get by id successfully",date:checkPhoto, sucess: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}

export const GetAllPhoto = async (req, res) => {

    try {


        let checkPhoto  = await Photo.find();
        
        if(!checkPhoto.length === 0){
            return res.status(404).json({ message: `photo not found`, success: false })
        }


        return res.status(200).json({ message: "photo get successfully",date:checkPhoto, sucess: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}