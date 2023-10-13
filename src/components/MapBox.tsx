import { mapboxgl } from "../lib/mapbox";
import React, { useEffect, useRef, useState } from "react";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
const apiKey = process.env.REACT_APP_MAPBOX_TOKEN;

mapboxgl.accessToken = apiKey;

type Props = {
  onSetLocation;
  centerLocation?;
  placeholder?;
};

export default function MapboxComponent({
  onSetLocation,
  centerLocation,
  placeholder,
}: Props) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: centerLocation
        ? [centerLocation[0], centerLocation[1]]
        : [-64.1816829, -31.4068799],
      zoom: centerLocation ? [14] : [10],
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: placeholder ? placeholder : "Buscar",
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    if (centerLocation) {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([centerLocation[0], centerLocation[1]])
        .addTo(map);

      markerRef.current = newMarker;
    }

    map.on("click", async (e) => {
      if (markerRef.current) {
        markerRef.current.remove();
      }

      const newMarker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

      markerRef.current = newMarker;

      map.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 14,
        speed: 1.5,
      });

      const reverseGeocodeData = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const reverseGeocodeJson = await reverseGeocodeData.json();
      const locationName = reverseGeocodeJson.features[0].text;
      onSetLocation({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        name: locationName,
      });
    });
  }, []);

  return (
    <div>
      <div id="geocoder" className="geocoder"></div>
      <div
        ref={mapContainerRef}
        id="mapbox"
        className="rounded-md w-full h-[265px]"
      ></div>
    </div>
  );
}
