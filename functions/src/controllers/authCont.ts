import UsersModel, { UserModel } from '../models/userSchema'
import { genPassword, validatePass, issueJWT } from '../utils/authUtils'
// import passport from 'passport'

//###CURRENTLY EVERY AUTHORIZATION REQUEST SENDS ALL USER INFO INCLUDING PHOTO 
export const authorizeUser = async (req: any, res: any) => {
    console.log('protected access granted')
    //sending ALLL user info with auth request, should be changed ###TEMP#####
    res.status(200).json({success: true, user: req.user})
}
// export const fetchUserInfo = async(req: any, res: any) => {
//     UserModel.findOne({username: req.body.username})
// }


export const loginUser = async (req: any, res: any, next: any) => {
    //Checks if user exists in DB first
    if(!req.body.username){
        res.status(401).json({success: false, msg: "No username entered"})
    }else if (!req.body.password) {
        res.status(401).json({success: false, msg: "No password entered"})
    } else {
        UserModel.findOne({username : req.body.username})
            .then((user : any) => {
                if(!user) {
                    return res.status(401).json({success: false, msg: "Could not find that user. Hmmm... "})
                }
                const isValid =  validatePass(req.body.password, user.hash, user.salt)
                if(isValid) {
                    const signedJWT = issueJWT(user)
                    res.status(200).json({ success: true, token: signedJWT.token, expiresIn: signedJWT.expires });
                }else{
                    res.status(401).json({success: false, msg: 'You entered the wrong password'})
                }
            }).catch((err)=> {next(err)})
    }
}
//Google test aytg
// export const googleLoginUser = async (req: any, res: any, next: any) => {
//         passport.authenticate('google', {scope:['email', 'profile']})
//         console.log(req.body)
// }

export const registerUser = async (req: any, res: any) => {
    try {
        if(req.body.password === '') throw "No Password";
        const saltHash = genPassword(req.body.password);
        const {salt, hash} = saltHash
    //Creating new Mongo User Information
        const newUser = new UsersModel({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            profileImg: req.body.profileImg,
            hash: hash,
            salt: salt,
         });
        await newUser.save()
        .then(() => {
            UserModel.findOne({username: req.body.username})
            .then((user : any) => {
                if(!user) {
                    return res.status(401).json({success: false, msg: "Something wen wrong,no user error."})
                }else{
                    const signedJWT = issueJWT(user)
                    res.status(200).json({success: true, user: user, token: signedJWT.token, expiresIn: signedJWT.expires })
                }
            })
        })
        

    } catch (error) {
        res.status(406).json({success: false, msg: error})
    }
}

export const updateUser = async (req: any, res: any) => {
    const updatedUser = req.body;
    const ID = req.user._id         
    await UserModel.findByIdAndUpdate({_id: ID}, {firstName : updatedUser.firstName, lastName : updatedUser.lastName, email: updatedUser.email,
                                        username: updatedUser.username, profileImg: updatedUser.profileImg, 
                                        baseLocation: {location: updatedUser.baseLocation.location, lng: updatedUser.baseLocation.lng, lat: updatedUser.baseLocation.lat}})
        .then(()=>{res.status(200).json({success: 'true'})})
        .catch((err)=> {res.status(401).json({success: 'false', error: err})})
}


export const fetchAllUsers = async (req: any, res: any) => {
    const allUsers = await UserModel.find()
    
    res.status(200).json({allUsers})
}

export const userPubInfo = async (req: any, res: any) => {
    console.log(req.params.username)
    await UserModel.findOne({username: req.params.username}).select('username _id profileImg firstName lastName')
    .then((result) => res.status(200).json({success: true, userinfo: result}))
}