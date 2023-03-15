import React, { useEffect, useRef, createElement } from "react";
import marker from '../assets/marker.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import mapboxgl from "mapbox-gl";
import geoJson from "./chicago-parks.json";

mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
const mapBoxStyle = "mapbox://styles/justinm3501/clezl0yws000j01qh9sb8as1l"

import {useFetchAllPostsQuery} from '../features/posts/postsSlice'

const Map = () => {
  //Pulling dom element using ref
  const mapContainer = useRef(null);
  const map = useRef(null);
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
        zoom: 1
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
        new mapboxgl.Marker({color: '#fffff'})
        .setLngLat([feature?.destCoordinates?.lng,feature?.destCoordinates?.lat])
        .addTo(map.current);
      });
    }
  },[isSuccess, data])
  
  return (
    <div ref={mapContainer} className="map-container" />)
}

export default Map
