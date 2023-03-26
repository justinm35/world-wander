import React, {useEffect, useRef} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from "mapbox-gl";

const LandingMap = () => {
    mapboxgl.accessToken = "pk.eyJ1IjoianVzdGlubTM1MDEiLCJhIjoiY2xlemkwbW1jMXNnczN2bWtyeGl0Zzk1MCJ9.mFADKJCRybPTMrtLp5r9kA"
    const mapBoxStyle = "mapbox://styles/justinm3501/clfej09fp000e01pk1192aw6u"

        //### Initialize Map in DOM element
    const landingMapContainer = useRef(null);
    const map : any = useRef(null);
    useEffect(() => {
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
            container: landingMapContainer.current ?? '',
            style: mapBoxStyle,
            center: [50, 50],
            zoom: 2.5,
            attributionControl: false
          })
          .setMaxZoom(2.5)
          .setMinZoom(2)

    },[]);//end of use effect
          // //clean up map on unmount
          // return () => map.remove();
          // }, []);//end of useEffect
      
  
  return (<div ref={landingMapContainer} className="landingMapContainer w-screen h-screen">
            <div className="bg-zinc-400 rounded-full w-52 h-40 scale-y-50 blur-xl mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 ml-2"/>
          </div>)
}

export default LandingMap
