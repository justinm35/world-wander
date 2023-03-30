import { useState } from 'react'
import AuthBG from  '../../assets/AuthBG.png' 
import { FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import "./register.css"

import { useRegisterUserMutation } from './AuthApiSlice';

const Register = ({setIsSignIn: setIsSignIn} : {setIsSignIn : React.Dispatch<React.SetStateAction<boolean>>}) => {
  //Config plugins for FilePond Input
  registerPlugin( FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop,
    FilePondPluginImageResize, FilePondPluginImageTransform,FilePondPluginImageEdit, FilePondPluginFileEncode);
  
  const [base64ProfileImg, setBase64ProfileImg] = useState('')
  const [userData, setUserData] = useState({username: "", email: "", password: ""})

  const [ registerUser, {data ,isLoading, isError}] = useRegisterUserMutation()

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const validateForm =  (newUser: any): string => {
      if(newUser.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return (newUser.email + 'YEs');
      }else{return ('No')}
    }
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
      const newUserData = {...userData, profileImg: base64ProfileImg}
      console.log(validateForm(newUserData))
      e.preventDefault()

      try {
        await registerUser({...userData, profileImg: base64ProfileImg})
            .then((a)=>console.log(a))
            .catch((err)=>console.log(err))
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="w-screen flex h-screen justify-center pt-40 over">
    <div className="w-full m-5 xl:w-5/6 h-5/6 bg-white rounded-3xl  shadow-md p-5 flex">
        <img src={AuthBG} className="h-full rounded-3xl  object-cover mr-5 w-0 lg:w-1/2 invisible lg:visible"/>
      <div className="w-full lg:w-1/2 flex flex-col items-center ">
        <p className="font-roboto font-normal text-lg text-right text-zinc-800 self-en self-end">Already a member? <a onClick={()=>setIsSignIn(x=>!x)} className='hover:underline hover:text-purple-600'>Sign In</a></p>
        <h2 className="font-roboto font-normal text-6xl text-center mt-4 text-zinc-800">Welcome!</h2>
        <p className="my-3 text-lg font-roboto text-zinc-800">Start sharing your travels with the world!</p>
          <form className='w-full flex items-center'>
            <div className='w-full flex flex-col items-center'>
            <FilePond 
                labelIdle={'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'}
                imagePreviewHeight={170}
                imageCropAspectRatio='1:1'
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
                stylePanelLayout='compact circle'
                styleLoadIndicatorPosition='center bottom'
                styleButtonRemoveItemPosition='center bottom'
                styleButtonProcessItemPosition='right bottom'
                styleImageEditButtonEditItemPosition='right bottom'
                className="filepond"
                name="filepond"
                allowImageEdit={true}
                acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
                allowFileEncode={true}
                onaddfile={(error, file) => {console.log(error); setBase64ProfileImg(()=> file?.getFileEncodeBase64String())}}
                />
              <input id="username" type="username" placeholder="Username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <input id="email" type="email" placeholder="Email" value={userData.email} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-5 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <input id="password" type="password" placeholder="Password" value={userData.password} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-5 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <button onClick={(e)=>handleSubmit(e)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-6 active:scale-95 transition">Sign Up</button>
              <div className='flex w-4/6 mt-16'>
                <div className="w-full bg-zinc-300 h-0.5"/>
                <p className="-mt-4 mx-4 min-w-fit text-lg font-roboto text-zinc-800">Or sign up with</p>
                <div className="w-full bg-zinc-300 h-0.5"/>
              </div>
            </div>
          </form>
          <button onClick={(e)=>handleSubmit(e)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-10 active:scale-95 transition">Google</button>
      </div>
    </div>
  </div>
  )
}

export default Register
