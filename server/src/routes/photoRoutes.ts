import util from 'util'
import fs from 'fs'
import path from 'path'
import express from 'express'
var cors = require("cors");
const readDir = util.promisify(fs.readdir);
var multer = require("multer");
var upload = multer({ dest: "../client/public/images" });

const router = express.Router()

import { addPhotos, removePhoto } from '../controllers/photoCont';

router.post('/addPhoto', upload.array("files", 12),addPhotos)
router.delete('/removePhoto/:id', removePhoto)


export default router