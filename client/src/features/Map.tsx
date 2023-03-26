import React, { useEffect, useRef, createElement, useState, ReactEventHandler } from "react";
import { createRoot } from "react-dom/client";
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import mapboxgl from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useFetchAllPostsQuery } from "./Posts/postsSlice";


mapboxgl.accessToken = "pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA"
const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u"

import PostsList from './Posts/PostsList'



const Marker = ({onClick, id, destination}: {onClick: ReactEventHandler, id: String, destination: string}) => {
  return (<button onClick={()=>onClick(id)}><MapPinIcon className="transition text-red-500 w-12 h-12 hover:animate-bounce"/><div className="hidden hover:show p-5 bg-red-300">Toronto, Canada</div></button>)
}

const Map = ({setDisplayedPost}) => {

  //### Initialize Map in DOM element
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
  },[]);//end of use effect
    // //clean up map on unmount
    // return () => map.remove();
    // }, []);//end of useEffect



  //#####Place all of the markers from props.
  const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts')
  useEffect(()=>{
    isSuccess &&
    data.allPosts.forEach((feature: any) => {
        const mapMarker = document.createElement("div");
        const renderMapmarker = createRoot(mapMarker)
        renderMapmarker.render(<Marker onClick={markerClicked} id={feature._id} destination={feature.destiantion}/>)
      // console.log(data)
        new mapboxgl.Marker(mapMarker)
        .setLngLat([feature?.destCoordinates?.lng,feature?.destCoordinates?.lat])
        .setOffset([0, -20])
        .addTo(map.current);
      })
  },[data,isSuccess])

  const markerClicked = (id: string) => {
    //Optimize to pass array index rather than entire object
    const displayedPostIndex = data.allPosts.findIndex((x: any)=> x._id === id) 
    setDisplayedPost(displayedPostIndex)
  }

  
  return (<>
    <div ref={mapContainer} className="map-container" >
      <div className="bg-zinc-400 rounded-full w-40 h-40 scale-y-50 blur-xl mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-5"/>
    </div>
    </>
    )
}

export default Map

