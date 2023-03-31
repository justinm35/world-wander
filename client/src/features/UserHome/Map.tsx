import { useEffect, useRef, createElement, useState, ReactEventHandler } from "react";
import { createRoot } from "react-dom/client";
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import mapboxgl, { MarkerOptions } from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useFetchAllPostsQuery } from "../Posts/postsSlice";
import { useAuthUserQuery } from "../AuthPage/AuthApiSlice";
import { useFetchUserPostsQuery } from "../Posts/postsSlice";


mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA'
const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u?optimize=true"


const Map = ({setDisplayedPost}: {setDisplayedPost : React.Dispatch<React.SetStateAction<number>>}) => {
  //Fetching all the posts from the logged in user
  const {data: auth, isSuccess: isFuffilled} = useAuthUserQuery()
  const {data: posts, error, isLoading,isError, isSuccess} = useFetchUserPostsQuery(auth?.user?._id , {skip : !isFuffilled});

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

  //Marker Icon
  interface ChildProps{markerClicked: (arg: string) => void;id: string;destination: string}
  const Marker : React.FC<ChildProps>= ({markerClicked, id, destination}) => {
    return (<button onClick={()=>markerClicked(id)}><MapPinIcon className="transition text-red-500 w-12 h-12 hover:animate-bounce"/><div className="hidden hover:show p-5 bg-red-300">Toronto, Canada</div></button>)
  }
  const markerClicked = (id: string) => {
    const displayedPostIndex = posts.allPosts.findIndex((x: any)=> x._id === id) 
    setDisplayedPost(displayedPostIndex)
  }
  //Place all of the markers from props.
  const [markerList, setMarkerList] = useState<any>([])
  useEffect(()=>{
    if(isSuccess){
      markerList.forEach((marker: any) => marker?.remove())
      setMarkerList([]);
      posts.allPosts.forEach((feature: any) => {
          const mapMarker = document.createElement("div");
          const renderMapmarker = createRoot(mapMarker)
          renderMapmarker.render(<Marker markerClicked={markerClicked} id={feature._id} destination={feature.destiantion}/>)
          let marker =  new mapboxgl.Marker(mapMarker)
          .setLngLat([feature?.destCoordinates?.lng,feature?.destCoordinates?.lat])
          .setOffset([0, -20])
              
          marker.addTo(map.current);
          setMarkerList((prevMarkers :any) => [...prevMarkers, marker])
          markerList.push(marker);
      })
    }
  },[posts,isSuccess])

  return (<>
    <div ref={mapContainer} className="map-container" >
      <div className="bg-zinc-400 rounded-full w-40 h-40 scale-y-50 blur-xl mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-3"/>
    </div>
    </>
    )
}

export default Map

