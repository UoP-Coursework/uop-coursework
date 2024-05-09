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
import InfoMarker from "./Markers";

const Markers = () => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();
  const [coords, setLocation] = useState<GeolocationCoordinates>();
  const [places, setPlaces] = useState<
    google.maps.places.PlaceResult[] | null
  >();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation(coords);
        console.log(coords);
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
        keyword: "Recyling",
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        rankBy: google.maps.places.RankBy.DISTANCE,
      },
      (result, status) => {
        setPlaces(result);
        console.log(status);
        console.log(result);
      },
    );
  }, [placesService, coords]);

  if (!places) {
    return <></>;
  }

  return (
    <>
      {places.map((value, index) => (
        <InfoMarker
          position={value.geometry!.location!}
          key={index}
          content={value.name}
        />
      ))}
    </>
  );
};

const MapComponent = () => {
  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId="454bad7cd35cc3fb"
        className="h-dvh"
        defaultCenter={{ lat: 43.65, lng: -79.38 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        fullscreenControl={false}
        disableDefaultUI={true}
        style={{
          height: "auto",
          width: "auto",
        }}
      >
        <Markers />
      </Map>
    </APIProvider>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
