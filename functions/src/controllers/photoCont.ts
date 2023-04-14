import fs from 'fs'
export const addPhotos = async (req: any, res: any) => {
     // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  res.send(req.files[0].filename);
  }

export const removePhoto = async(req: any, res: any) =>{
  fs.unlink("../client/public/images/" + req.params.id, (err) => {
    if (err) {
      res.status(500).json({message: "Could not delete the file. " + err});
    }
    res.status(200).json({message: "File is deleted."});
  });
}