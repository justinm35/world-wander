import { FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import { useRegisterUserMutation, useAuthUserQuery } from './AuthApiSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface IRegisterPg2 {
    handleChange: (e: any) => void;
    userData: {username: string, email: string, password: string, firstName:string, lastName: string, profileImg: string};
    setUserData: React.Dispatch<React.SetStateAction<{username: string, email: string, password: string, firstName:string, lastName: string, profileImg: string}>>;
    setFormPage: (e: any) => void;
}

const RegisterPg2 = ({handleChange, userData, setUserData, setFormPage}: IRegisterPg2) => {
    const navigate = useNavigate()
    registerPlugin( FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop,
        FilePondPluginImageResize, FilePondPluginImageTransform,FilePondPluginImageEdit, FilePondPluginFileEncode);
        const [ registerUser, {data ,isLoading, isError}] = useRegisterUserMutation()
        const { refetch } = useAuthUserQuery()
        
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault()
            try {
              await registerUser({...userData})
                .then((response : any)=>{
                    localStorage.setItem('Bearer' , response?.data?.token)
                    setUserData({username: "", email: "", password: "", firstName:"", lastName: "", profileImg: ""})
                    refetch()
                    navigate('/mywanders')
                })
                .catch((err)=>console.log(err))
                
                console.log(data)
            } catch (error) {
              console.log(error)
            }
          }

  return (
    <div className='w-full lg:w-4/6 flex flex-col items-center pt-10'>
         <FilePond 
            labelIdle={'Drag & Drop your profile picture or <span class="filepond--label-action">Browse</span>'}
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
            onaddfile={(error, file : any) => {console.log(error); setUserData({...userData, profileImg : file?.getFileEncodeBase64String()})}}
        />
        <input id="username" type="username" placeholder="Username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-full p-3 mt-10 lg:mt-10 font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/> 
        <p className="text-roboto text-zinc-500 text-xs lg:text-lg pt-2 w-11/12">* Your username will be used to create a unique url for your wanders. (e.g. worldwander.com/johnsmith12)</p>
        <button onClick={(e)=>handleSubmit(e)} className="w-full bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-xl mt-6 active:scale-95 transition flex items-center justify-center">Create Account</button>
        <a onClick={()=>setFormPage(true)} className="text-md lg:text-xl font-roboto text-zinc-800 self-start flex mt-3 items-center hover:underline hover:cursor-pointer"><ArrowLeftIcon className="w-4 lg:w-6 mr-1"/>Back</a>
    </div>
  )
}

export default RegisterPg2
