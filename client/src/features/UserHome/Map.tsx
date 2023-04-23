import { useEffect, useRef, createElement, useState, ReactEventHandler } from "react";
import { createRoot } from "react-dom/client";
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import mapboxgl, { MarkerOptions } from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { changeDisplayedPost } from "../Posts/displaySlice";
import { useSelector } from "react-redux";
import { useAuthUserQuery } from "../AuthPage/AuthApiSlice";
import { useFetchUserPostsQuery } from "../Posts/postsSlice";


mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA'
const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u?optimize=true"


const Map = () => {
  const dispatch = useDispatch()

  //Fetching all the posts from the logged in user
  const {data: auth, isSuccess: isFuffilled} = useAuthUserQuery()
  const {data: posts, error, isLoading,isError, isSuccess} = useFetchUserPostsQuery(auth?.user?._id , {skip : !isFuffilled});
  //Reading the redux state and subscribing to any changes so state changes triggere re-render
  const displayedPost = useSelector((state : {displaySlice: {idCurrent: string}}) => state?.displaySlice)

  //Initialize and Render the map on component mount/unmount
  const mapContainer = useRef(null);
  const map : any = useRef(null);
  useEffect(() => {
    dispatch(changeDisplayedPost('null'))
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
  
  useEffect(() => { // Trigger the fly to once the global state is changed
   const displayedIndex = posts?.allPosts.findIndex((post : IPosts)=> post._id === displayedPost.idCurrent)
    if(displayedPost.idCurrent.length >= 10 && posts?.allPosts[displayedIndex]?.destCoordinates?.lng &&  posts?.allPosts[displayedIndex]?.destCoordinates?.lat) {
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


  return (<>
    <div ref={mapContainer} className="map-container" >  
    </div>
    </>
    )
}

export default Map

