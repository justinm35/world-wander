import React, { useState, useCallback, useRef } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import { useAddNewPostMutation } from './postsSlice'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PropTypes } from 'react-places-autocomplete';


const PostsForm = ({switchFormStatus}) => {

  type IPostData = {destination?:string, dateTraveled: string, tripLength: string, description: string}
  const [postData , setPostData] = useState<IPostData>({dateTraveled: '', tripLength: '', description: ''})
  const [destinationData, setDestinationData] = useState('')

  const clear = () => {
    setPostData({dateTraveled: '', tripLength: '', description: ''})
    setDestinationData('')
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
    } catch (error) {
      console.log(error)
    }
  }
   

  const [addNewPost, { isLoading, error}] = useAddNewPostMutation()
  const [errorHandling, setErrorHandling] = useState('')
  const onSubmit = async (e : React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
  
    try {
      const coords = await geoCodeLatLng(destinationData)
      const newPost = {...postData, destination: destinationData, destCoordinates: {...coords}}
      await addNewPost(newPost).unwrap()
      clear()
      setErrorHandling('')
    } catch (error) {
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


  const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading } : {getInputProps: any;getSuggestionItemProps: any; suggestions: ReadonlyArray<Suggestion>, loading: boolean; }) => (
   <div className="autocomplete-root">
      <input className="block w-full p-4 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-50" {...getInputProps()} />
      <div className="absolute bg-gray-900 rounded-md">
              {loading && <div className='text-lg font-sans text-slate-100'>Loading...</div>}
              {suggestions.map(suggestion => {
                return (
                  <div key={suggestion.description} className='text-xl font-sans px-3 py-2 text-slate-100' {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
        </div>
    </div>
  );

  return (
  <div className="flex flex-col mt-5 backdrop-blur-lg  bg-slate-800/25 shadow-xl max-w-lg rounded-xl p-6 absolute bottom-10 right-10 w-3/6">
    <div className="flex justify-between w-full h-full"><h1 className="font-sans text-3xl font-bold text-slate-200">New Wander</h1><button onClick={()=>switchFormStatus()}><XMarkIcon className="h-10 w-10 text-slate-200" /></button></div>
      <form onSubmit={onSubmit}>
          <label htmlFor="" className="block mb-1 ml-1 mt-5 text-lg font-sans place-self-start font-medium text-slate-100">Destination</label>
          <PlacesAutocomplete id="destination" value={destinationData} onChange={handleDestChange}>
                {renderFunc}
          </PlacesAutocomplete>

          <div className="flex space-x-10">
            <label className="block mb-1 ml-1 mt-5 text-lg font-sans place-self-start font-medium w-1/2 text-slate-100">Date Traveled
            <input id="dateTraveled" onChange={handleChange} value={postData.dateTraveled} type="date"  className="block w-full p-4 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
            </label>

            <label className="block mb-1 ml-1 mt-5 text-lg font-sans place-self-start font-medium text-slate-100">Length of Trip
            <input id="tripLength" onChange={handleChange} value={postData.tripLength} type="number" className="block w-full p-4 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
            </label>
          </div>

          <label className="block mb-1 ml-1 mt-5 text-lg font-sans place-self-start font-medium text-slate-100">Description</label>
          <textarea id="description" onChange={handleChange} value={postData.description} className="mt-1 block w-full  text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-5000" rows={8} spellCheck="false"></textarea>
          
          <p className="text-red-700 font-sans font-medium text-2xl text-center pt-2"> {errorHandling}</p>

          <button className="transition duration-300 my-5 p-3 bg-purple-700 rounded-full w-full  text-xl font-sans font-medium text-white hover:bg-purple-600 hover:scale-110">Post</button>
      </form>
  </div>)
}

export default PostsForm
