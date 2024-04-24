"use client";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { env } from "~/env";

const Geolocate = () => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();
  const [coords, setLocation] = useState<GeolocationCoordinates>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation(coords);
      });
    }
  }, []);

  useEffect(() => {
    if (!placesLib || !map) return;

    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib, map]);

  useEffect(() => {
    if (!placesService || !coords) return;

    placesService.nearbySearch(
      {
        keyword: "Recyling Plant",
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      },
      (result, status) => {
        console.log(status);
        console.log(result);
      },
    );
  }, [placesService, location]);

  return (
    // <div className="m-0 h-screen w-screen p-0 text-center text-black">
    //   <pre>{JSON.stringify({ a: "v" })}</pre>
    // </div>
    <div className="control-panel">
      <h3>Basic Map</h3>
      <p>
        The simplest example possible, just rendering a google map with some
        settings adjusted.
      </p>
      <div className="links">
        <a
          href="https://codesandbox.io/s/github/visgl/react-google-maps/tree/main/examples/basic-map"
          target="_new"
        >
          Try on CodeSandbox ↗
        </a>

        <a
          href="https://github.com/visgl/react-google-maps/tree/main/examples/basic-map"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
};

const MapComponent = () => {
  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={{ lat: 43.65, lng: -79.38 }}
        zoom={5}
        gestureHandling={"greedy"}
        fullscreenControl={false}
      >
        <Geolocate />
      </Map>
    </APIProvider>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
