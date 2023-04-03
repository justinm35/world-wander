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

const RegisterPg2 = ({handleChange, userData, setUserData}) => {
    const navigate = useNavigate()
    registerPlugin( FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop,
        FilePondPluginImageResize, FilePondPluginImageTransform,FilePondPluginImageEdit, FilePondPluginFileEncode);
        const [ registerUser, {data ,isLoading, isError}] = useRegisterUserMutation()
        const { refetch } = useAuthUserQuery()
        
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
            const newUserData = {...userData}
            e.preventDefault()
            try {
              await registerUser({...userData})
                .then((response)=>{
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
            onaddfile={(error, file : any) => {console.log(error); setUserData({...userData, profileImg : file?.getFileEncodeBase64String()})}}
        />
        <input id="username" type="username" placeholder="Username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-3 mt-10 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/> 
        <button onClick={(e)=>handleSubmit(e)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-6 active:scale-95 transition flex items-center justify-center">Create Account</button>
    </div>
  )
}

export default RegisterPg2
