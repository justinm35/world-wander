import util from 'util'
import fs from 'fs'
import path from 'path'
import express from 'express'
const readDir = util.promisify(fs.readdir);

var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, '../client/public/images')
    },
    filename: function (req: any, file: any, cb: any) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null,uniqueSuffix + "." + extension)
    }
  })
  var upload = multer({storage:storage})
// var upload = multer({ dest: "../client/public/images" });
async function getImageList(dir: any) {
    try {
      return await readDir(path.join(__dirname, "public", dir));
    } catch (error) {
      throw error;
    }
  }


const router = express.Router()

import { addPhotos, removePhoto } from '../controllers/photoCont';

// upload.array("images", 10)
router.post('/addPhoto',upload.array("images", 10),addPhotos)
router.delete('/removePhoto/:id', removePhoto)


export default router