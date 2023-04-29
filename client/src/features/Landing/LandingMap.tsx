import React, {useEffect, useRef} from 'react'
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from "mapbox-gl";
import './LandingMap.css'
import { useFetchAllusersQuery } from '../AuthPage/AuthApiSlice';
import UserMarker from './UserMarker';


const LandingMap = () => {
    mapboxgl.accessToken = "pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA"
    const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u?optimize=true"
const {data, isSuccess} = useFetchAllusersQuery()
  
        //### Initialize Map in DOM element
    const landingMapContainer: any = useRef(null);
    const map : any = useRef(null);
    const windowSize = useRef([window.innerWidth, window.innerHeight]); // Get screen width and height for map zoom


    useEffect(() => {
      let zoomInit;
      let maxZoom;
      if(windowSize.current[0] <= 1280 ){zoomInit = 0.7; maxZoom = 1}else{zoomInit = 2 ; maxZoom = 3}
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
            container: landingMapContainer.current ?? '',
            style: mapBoxStyle,
            center: [-74.5, 40],
            zoom: zoomInit,
            attributionControl: false,
            trackResize: true,
          })
          .setMaxZoom(maxZoom)
          .setMinZoom(1)
        return ()=> map.current?.remove
    },[]);
      

    useEffect(()=>{
            isSuccess &&
            data.allUsers.forEach((user: any) => {
              if(user?.baseLocation.lng && user?.baseLocation.lat){
                const mapMarker = document.createElement("div");
                const renderMapmarker = createRoot(mapMarker)
                renderMapmarker.render(<UserMarker username={user.username} profileImg={user.profileImg}/>)
                new mapboxgl.Marker(mapMarker)
                .setLngLat([user?.baseLocation?.lng,user?.baseLocation?.lat])
                .setOffset([0, -20])
                .addTo(map.current);
              }
              })
          },[data,isSuccess])
  return (
        <>
          <div ref={landingMapContainer} className="landingMapContainer w-screen h-screen lg:mt-0">
          </div>
        </>
          )
}

export default LandingMap
