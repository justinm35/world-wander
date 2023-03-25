import React, { useEffect, useRef, createElement, useState, ReactEventHandler } from "react";
import { createRoot } from "react-dom/client";
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import mapboxgl from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/24/solid";

mapboxgl.accessToken = "pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA"
const mapBoxStyle = "mapbox://styles/justinm3501/clezl0yws000j01qh9sb8as1l"

import {useFetchAllPostsQuery} from './Posts/postsSlice'
import PostsList from './Posts/PostsList'

const Marker = ({onClick, id, destination}: {onClick: ReactEventHandler, id: String, destination: string}) => {
  return (
    <button onClick={()=>onClick(id)}><MapPinIcon className="transition text-red-500 w-12 h-12 hover:animate-bounce"/><div className="hidden hover:show p-5 bg-red-300">Toronto, Canada</div></button>
  )
}


const Map = () => {
  //Pulling dom element using ref
  const mapContainer = useRef(null);
  const map : any = useRef(null);
  const greeting = createElement(
    'h1',
    { className: 'greeting' },
    'Hello'
    );
    
    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current ?? '',
        style: mapBoxStyle,
        center: [50, 50],
        zoom: 2
      })
      .setMaxZoom(4)
      map.current.on('style.load', () => {
        map.current.setFog({
            'space-color': 'rgb(20,20,20)',
            'star-intensity': 0.1,
            'horizon-blend': 0.05
        });
    });
    },[]);//end of use effect
    // //clean up map on unmount
    // return () => map.remove();
    // }, []);//end of useEffect

    //implement redux slices to manage global api fetched state
  const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts')
  useEffect(()=>{
    if(isSuccess){
      data.allPosts.forEach((feature: object) => {

        const mapMarker = document.createElement("div");
        const renderMapmarker = createRoot(mapMarker)
        renderMapmarker.render(<Marker onClick={markerClicked} id={feature._id} destination={feature.destiantion}/>)

        new mapboxgl.Marker(mapMarker)
        .setLngLat([feature?.destCoordinates?.lng,feature?.destCoordinates?.lat])
        .setOffset([0, -20])
        .addTo(map.current);
      });
    }
  },[isSuccess, data])
  const[displayedPost, setDisplayedPost] = useState({})
  const markerClicked = (id: string) => {
    //Optimize to pass array index rather than entire object
    const displayedPostIndex = data.allPosts.find((x)=> x._id === id)
    setDisplayedPost(displayedPostIndex)
  }
  return (<>
    <div ref={mapContainer} className="map-container" />
    <PostsList displayedPost={displayedPost} />
    </>
    )
}

export default Map

