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
    useEffect(() => {
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
            container: landingMapContainer.current ?? '',
            style: mapBoxStyle,
            center: [-74.5, 40],
            zoom: 2,
            attributionControl: false,
            trackResize: true,
          })
          .setMaxZoom(3)
          .setMinZoom(1)
    },[]);//end of use effect
          // //clean up map on unmount
          // return () => map.remove();
          // }, []);//end of useEffect
          if(isSuccess){
            console.log(data)
            // map.current?.flyTo({ center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],essential: true})
          }
      

    useEffect(()=>{
            isSuccess &&
            data.allUsers.forEach((user: any) => {
              if(user?.baseLocation?.lng && user?.baseLocation?.lat){
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
  
  return (<>
          <div ref={landingMapContainer} className="landingMapContainer w-screen h-screen">
          </div>
            {/* <div className="bg-zinc-400 rounded-full w-52 h-40 scale-y-50 blur-xl mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-2"/> */}
        </>
          )
}

export default LandingMap
