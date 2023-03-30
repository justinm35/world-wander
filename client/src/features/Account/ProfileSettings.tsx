import { useCallback, useEffect, useState } from "react";
import { useAuthUserQuery } from "../AuthPage/AuthApiSlice"
import { useUpdateUserMutation } from "../AuthPage/AuthApiSlice";
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';

const ProfileSettings = () => {
    const {data, isSuccess: infoSuccess} = useAuthUserQuery();
    const [updatedUser, {isLoading, isSuccess }] = useUpdateUserMutation()

    const [updatedData, setUpdatedData] = useState({firstName: '', lastName: '', username: '', email: '', profileImg: '', baseLocation: {location: '', lat: '', lng: ''} })
    useEffect(()=> {
        if(infoSuccess){
            setUpdatedData({...updatedData, firstName: data?.user?.firstName, lastName: data?.user?.lastName, username : data?.user?.username, email : data?.user?.email, profileImg: data?.user?.profileImg, baseLocation: { location: data?.user?.baseLocation?.location, lat: data?.user?.baseLocation?.lat, lng: data?.user?.baseLocation?.lng} })
            setDestinationData(data?.user?.baseLocation?.location)
        }
    }, [infoSuccess])


    const geoCodeLatLng = async (address: string) => {
      try {
        let lngLatCoords = await geocodeByAddress(address)
        let lngLatCoordsObj = await getLatLng(lngLatCoords[0]) 
        return lngLatCoordsObj;
      } catch (error: any) {
        console.log(error)
      }
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setUpdatedData({...updatedData, [event.target.id] : value})
    }
    const handleSubmitChanges = async (e) => {
        e.preventDefault()
        const coords = await geoCodeLatLng(destinationData)
        console.log(coords)
        const updatedUserTotal = {...updatedData, baseLocation: {location : destinationData, ...coords}}
        updatedUser(updatedUserTotal)
    }
    const [destinationData, setDestinationData] = useState('')

    const handleDestChange = (value: string) => {
        setDestinationData(value)
      }
    const autoCompleteFill = useCallback(({ getInputProps, getSuggestionItemProps, suggestions, loading } : {getInputProps: any;getSuggestionItemProps: any; suggestions: ReadonlyArray<Suggestion>, loading: boolean; }) => (
        <div className="autocomplete-root">
           <label className="font-roboto text-xl font-medium">Location
            <input className="w-full p-3 mt-1 font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg " {...getInputProps()} placeholder="Your current location (Dont worry, it's not public)"/>
           </label>
           <div className="absolute bg-white rounded-xl shadow-lg mt-1">
                   {loading && <div className='text-xl font-roboto text-zinc-800'>Loading...</div>}
                   {suggestions.map(suggestion => {
                     return (
                       <div key={suggestion.description} className=' transition text-lg font-roboto font-medium px-6 py-2 text-zinc-800 hover:text-purple-700 hover:scale-105' {...getSuggestionItemProps(suggestion)}>
                         <span>{suggestion.description}</span>
                       </div>
                     );
                   })}
             </div>
         </div>
       ), [destinationData])

    if(infoSuccess) {
        return (   
            <div className="w-2/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4">
            <form className="flex flex-col w-full space-y-5" onSubmit={handleSubmitChanges}>
              <div className="flex">
              <img src={'data:image/png;base64,' + updatedData.profileImg} className="w-32 rounded-full mb-5"/>
              <p className="ont-roboto text-2xl font-medium mt-10 ml-6">Avatar</p>
              </div>
              <div className="flex w-full">
                <label className="font-roboto text-xl font-medium flex flex-col w-1/2 mr-4">First Name
                    <input id="firstName" value={updatedData.firstName} type="text" placeholder="Your first name"  onChange={handleChange} className=" w-full p-3 mt-1 font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
                </label>
                <label className="font-roboto text-xl font-medium flex flex-col w-1/2">Last Name
                    <input id="lastName" value={updatedData.lastName} type="text" placeholder="Your last name"  onChange={handleChange} className=" w-full p-3 mt-1 font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
                </label>
              </div>
             <label className="font-roboto text-xl font-medium">Username
                <input id="username" value={updatedData.username} type="text" placeholder="Username"  onChange={handleChange} className=" w-full p-3 mt-1  font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
             </label>
             <label className="font-roboto text-xl font-medium">Email
                <input id="email" value={updatedData.email} type="email" placeholder="Your email"  onChange={handleChange} className=" w-full p-3 mt-1  font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
             </label>
             <PlacesAutocomplete id="destination" value={destinationData} onChange={handleDestChange}>
                {autoCompleteFill}
            </PlacesAutocomplete>
             <button className="w-full bg-zinc-800 text-white rounded-md h-14 text-xl active:scale-95 transition disabled:bg-zinc-500" disabled={isLoading? true : false}>Save Changes </button>
             {isSuccess && <h1>Congrats its updated</h1>}
            </form>
            </div>
        )
    }else{
      return (<h1>Loading...</h1>)
    }
}

export default ProfileSettings
