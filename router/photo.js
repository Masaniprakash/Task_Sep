import express from "express";
import { createPhoto, deletePhoto, GetAllPhoto, GetPhotoByID, updatePhoto } from "../controller/photo.js";
import multer from "multer"


const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.post("/create",upload.any("files"),createPhoto)
router.put("/update",updatePhoto)
router.delete("/delete",deletePhoto)
router.get("/all",GetAllPhoto)
router.get("/get/:id",GetPhotoByID)

export default router;