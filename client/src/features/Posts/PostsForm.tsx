import { useState, useCallback, useRef } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import { useAddNewPostMutation } from './postsSlice'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import './postForm.css'
import { useDeletePhotoMutation } from './postsSlice';
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice';
import TextareaAutosize from 'react-textarea-autosize';

const PostsForm = ({setDisplayedComponent}:{setDisplayedComponent :  React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)  

  const [deletePhoto, result]= useDeletePhotoMutation()
  
  type IPostData = {destination?:string, dateTraveled: string, tripLength: string, description: string}
  //Config data inputs
  const [postData , setPostData] = useState<IPostData>({dateTraveled: '', tripLength: '', description: ''})
  const [destinationData, setDestinationData] = useState('')
  const [files, setFiles] = useState([]);

  const clear = () => {
    setPostData({dateTraveled: '', tripLength: '', description: ''})
    setDestinationData('')
    setFiles([])
  }
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setPostData({...postData, [event.target.id] : value})
  }
  const handleDestChange = (value: string) => {
    setDestinationData(value)
  }
  
  const geoCodeLatLng = async (address: string) => {
    try {
      let lngLatCoords = await geocodeByAddress(address)
      let lngLatCoordsObj = await getLatLng(lngLatCoords[0]) 
      return lngLatCoordsObj;
    } catch (error: any) {
      console.log(error)
    }
  }
   
const {data, isSuccess} = useAuthUserQuery()
  const [addNewPost, { isLoading, error}] = useAddNewPostMutation()
  const [errorHandling, setErrorHandling] = useState('')

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const coords = await geoCodeLatLng(destinationData)
      const photos = files.map((file : any)=> file?.serverId)
      console.log(photos)
      console.log(files)
      const newPost = {...postData, destination: destinationData, destCoordinates: {...coords}, photos: photos, creator: data.user._id}
      await addNewPost(newPost).unwrap()
      clear()
      setErrorHandling('')
    } catch (error: any) {
      //back end response error handling
      console.log(Object.keys(error?.data?.message?.errors).toString());
      switch (Object.keys(error?.data?.message?.errors).toString()) {
        case 'tripLength':
          setErrorHandling('You forget to enter the length of this trip!')
          break;
        case 'destination':
          setErrorHandling('You forget to enter the destination of this trip!')
          break;
        case 'dateTraveled':
          setErrorHandling('You forget to enter the date you left for this trip!')
          break;
        case 'destCoordinates':
          setErrorHandling('Hmmm... We cant seem to find the destinatin you entered. Try again.')
          break;
        default:
          setErrorHandling(error?.data?.message?._message)
          break;
      }
    }
  }
const autoCompleteFill = useCallback(({ getInputProps, getSuggestionItemProps, suggestions, loading } : {getInputProps: any;getSuggestionItemProps: any; suggestions: ReadonlyArray<any>, loading: boolean; }) => (
    <div className="autocomplete-root">
       <input className="block p-3 w-full font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg" {...getInputProps()} placeholder='e.g. Rome, Italy'/>
       <div className="absolute bg-white rounded-xl  shadow-lg">
               {loading && <div className='text-xl font-roboto text-zinc-800'>Loading...</div>}
               {suggestions.map(suggestion => {
                 return (
                   <div key={suggestion.description} className='transition text-3xl font-roboto font-medium px-10 py-2 text-zinc-800 hover:text-purple-700 hover:scale-105 max-w-lg truncate' {...getSuggestionItemProps(suggestion)}>
                     <span>{suggestion.description}</span>
                   </div>
                 );
               })}
         </div>
     </div>
   ), [destinationData])

  
  return (
  <div className="flex flex-col bg-white shadow-xl rounded-3xl p-6 w-11/12 md:w-11/12 lg:w-11/12 xl:w-1/2 z-10">
    <div className="flex justify-between w-full h-full"><button onClick={()=>setDisplayedComponent(x=>!x)}><XMarkIcon className="h-10 w-10 text-zinc-800 mb-5" /></button></div>
      <form onSubmit={onSubmit} className="flex flex-row flex-wrap gap-5 w-full">
      <div className=" flex-grow w-1/3">
        <label className="font-roboto text-xl font-medium flex flex-col">Photos
          <FilePond files={files} onupdatefiles={(e: any)=>setFiles(e)} instantUpload={true} allowReorder={true} allowMultiple={true}
              allowFileEncode={true} maxFiles={4}
              server={{
                url: "http://localhost:3500/photos",
                process: "/addPhoto",
                //Revert method should be passing id as req.body
                // revert: `/removePhoto?id=${files[0]?.serverId}`
                revert: async (uniqueId, load, error) => {
                  console.log("removing: " + uniqueId)
                  try {
                    await deletePhoto(uniqueId)
                    load();
                  } catch (error) {
                    console.log(error)
                  }
                  error('oops')
                }
              }}
              name="images"
              labelIdle='Add some pics! <span class="filepond--label-action">Browse</span>'
            />
        </label>
      </div>
      <div className=" flex-grow  space-y-3">
        <label className="font-roboto text-xl font-medium flex flex-col">Destination
          <PlacesAutocomplete value={destinationData} onChange={handleDestChange}>
            {autoCompleteFill}
          </PlacesAutocomplete>
        </label>
        <div className="flex flex-wrap gap-3">
          <label className="font-roboto text-xl font-medium flex flex-col basis-1/3 flex-grow">Date Travled
            <input id="dateTraveled" onChange={handleChange} value={postData.dateTraveled} type="date"  className="block p-3 w-full  font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg"/>
          </label>
          <label className="font-roboto text-xl font-medium flex flex-col basis-1/3 flex-grow">Trip Length
            <input id="tripLength" onChange={handleChange} value={postData.tripLength} type="number" className="block p-3 w-full font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg"/>
          </label>
        </div>

        <label className="font-roboto text-xl font-medium flex flex-col">Date Travled
          <TextareaAutosize placeholder="Beautiful architecture and amazing food!..." id="description" onChange={(e: any)=>handleChange(e)} value={postData.description} 
          className="block p-2 w-full font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg" minRows={2} spellCheck="false"/>
        </label>
        <p className="text-red-700 font-sans font-medium text-2xl text-center pt-2"> {errorHandling}</p>
          <button className="w-full bg-zinc-800 text-white rounded-md h-14 text-xl mt-10 active:scale-95 transition">Post</button>
      </div>     
      </form>
  </div>)
}

export default PostsForm
