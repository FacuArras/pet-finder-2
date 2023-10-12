import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Marker, Feature, Layer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

type Props = {
  onSetLocation;
  center?;
  placeholder?;
};

export default function MapComponent({
  onSetLocation,
  center,
  placeholder,
}: Props) {
  const container = useRef();
  const [coords, setCoords] = useState();
  const [markerLocation, setMarkerLocation] = useState(null);
  const [centerLocation, setCenterLocation] = useState(null);

  useEffect(() => {
    if (center) {
      setCenterLocation([center.lng, center.lat]);
      setMarkerLocation(center);
    }
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      countries: "Ar",
      marker: false,
      placeholder: placeholder ? placeholder : "Buscar",
    });
    geocoder.addTo(container.current);

    geocoder.on("result", (e) => {
      setCenterLocation(e.result.center);
    });
  }, []);

  const handleOnClick = async (map, e) => {
    setMarkerLocation(e.lngLat);
    setCenterLocation([e.lngLat.lng, e.lngLat.lat]);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw`
      );
      const data = await response.json();
      onSetLocation({
        lng: data.features[0].center[0],
        lat: data.features[0].center[1],
        name: data.features[0].text,
      });
    } catch (error) {
      console.error("Error al obtener la información del lugar:", error);
    }
  };

  return (
    <div>
      <div ref={container}></div>
      <Map
        style="mapbox://styles/mapbox/streets-v12"
        containerStyle={{
          height: "265px",
          width: "100%",
        }}
        zoom={centerLocation ? [14] : [10]}
        className="rounded-md"
        center={
          centerLocation
            ? [centerLocation[0], centerLocation[1]]
            : [-64.1816829, -31.4068799]
        }
        onClick={handleOnClick}
      >
        {markerLocation ? (
          <Marker coordinates={[markerLocation.lng, markerLocation.lat]}>
            <i className="fa-solid fa-location-dot text-2xl text-[#1a2631]"></i>
          </Marker>
        ) : null}
      </Map>
    </div>
  );
}
