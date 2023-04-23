import { FC, useRef, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';
import mapboxgl, { MarkerOptions } from "mapbox-gl";
import { useDispatch, useSelector } from 'react-redux';
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useAuthUserQuery } from "../AuthPage/AuthApiSlice";
import { changeDisplayedPost } from "../Posts/displaySlice";
import { useFetchUserPostsQuery } from "../Posts/postsSlice";


interface PublicUserMapProps {
  paramsUID : string
}
mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA'
const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u?optimize=true"   

const PublicUserMap: FC<PublicUserMapProps> = ({paramsUID}) => {
    const dispatch = useDispatch()

 //Fetching all the posts from the logged in user *****CURRENT HARDCODED ID******
  const {data: posts, error, isLoading,isError, isSuccess} = useFetchUserPostsQuery(paramsUID);

//Initialize and Render the map on component mount/unmount
  const mapContainer = useRef(null);
  const map : any = useRef(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: mapBoxStyle,
      center: [50, 50],
      zoom: 1,
      attributionControl: false
    })
    .setMaxZoom(2.5)
    return ()=> map.current?.remove
  },[]);

  const displayedPost = useSelector((state : {displaySlice: {idCurrent: string}}) => state?.displaySlice)
  useEffect(() => { // Trigger the fly to once the global state is changed
    const displayedIndex = posts?.allPosts.findIndex((post : IPosts)=> post._id === displayedPost.idCurrent)
     if(displayedPost.idCurrent.length >= 10) {
       map.current?.flyTo({
         center: [ posts?.allPosts[displayedIndex]?.destCoordinates?.lng, posts?.allPosts[displayedIndex]?.destCoordinates?.lat],
         essential: true,
         duration: 2000
         });
      }
   }, [displayedPost])

//Marker Icon
interface ChildProps{markerClicked: (arg: string) => void;id: string;destination: string}
const Marker : React.FC<ChildProps>= ({markerClicked, id, destination}) => {
  return (<button onClick={()=>markerClicked(id)}><MapPinIcon className="transition text-red-500 w-12 h-12 hover:animate-bounce"/><div className="hidden hover:show p-5 bg-red-300">Toronto, Canada</div></button>)
}
const markerClicked = (id: string) => {
  dispatch(changeDisplayedPost(id))
  // const displayedPostIndex = posts.allPosts.findIndex((x: any)=> x._id === id) 
  // setDisplayedPost(displayedPostIndex)
}

//Creating state of markets to clean up later in useEffect. Prevents zombie markers.
const [markerList, setMarkerList] = useState<any>([])
useEffect(()=>{
  if(isSuccess){
    markerList.forEach((marker: any) => marker?.remove())
    setMarkerList([]); 
    posts.allPosts.forEach((feature: any) => {
      if(feature.destCoordinates.lng, feature.destCoordinates.lat){
        const mapMarker = document.createElement("div");
        const renderMapmarker = createRoot(mapMarker)
        renderMapmarker.render(<Marker markerClicked={markerClicked} id={feature._id} destination={feature.destiantion}/>)
          let marker =  new mapboxgl.Marker(mapMarker)
          .setLngLat([feature?.destCoordinates?.lng, feature?.destCoordinates?.lat])
          .setOffset([0, -20])
    

            
        marker.addTo(map.current);
        setMarkerList((prevMarkers :any) => [...prevMarkers, marker])
        markerList.push(marker);
      }
    })
  }
},[posts,isSuccess])


  return (
    <div ref={mapContainer} className="map-container" >
    </div>)
}

export default PublicUserMap