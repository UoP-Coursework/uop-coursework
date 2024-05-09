"use client";
import { Loader } from "@mantine/core";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { env } from "~/env";
import InfoMarker from "./Markers";

const Markers = ({ coords }: { coords: GeolocationCoordinates }) => {
  const map = useMap();

  const placesLib = useMapsLibrary("places");
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();
  const [places, setPlaces] = useState<
    google.maps.places.PlaceResult[] | null
  >();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!placesLib || !map) return;

    setPlacesService(new placesLib.PlacesService(map));
  }, [placesLib, map]);

  useEffect(() => {
    if (!placesService || !coords) return;

    placesService.nearbySearch(
      {
        keyword: "recycling",
        location: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        rankBy: google.maps.places.RankBy.DISTANCE,
      },
      (result, _, nextPageToken) => {
        if (!result) return;
        setPlaces((prev) => [...(prev ?? []), ...result]);
        console.log("placesService hasNextPage", nextPageToken?.hasNextPage);
        if (nextPageToken?.hasNextPage) {
          nextPageToken.nextPage();
        } else {
          setIsLoading(false);
        }
      },
    );
    // placesService.nearbySearch(
    //   {
    //     keyword: "recycling",
    //     location: {
    //       lat: coords.latitude,
    //       lng: coords.longitude,
    //     },
    //     rankBy: google.maps.places.RankBy.DISTANCE,
    //   },
    //   (result, _, nextPageToken) => {
    //     if (!result) return;
    //     setPlaces((prev) => [...(prev ?? []), ...result]);
    //     console.log("placesService hasNextPage", nextPageToken?.hasNextPage);
    //     if (nextPageToken?.hasNextPage) {
    //       nextPageToken.nextPage();
    //     } else {
    //       setIsLoading(false);
    //     }
    //   },
    // );
    // placesService.textSearch(
    //   {
    //     query: "recyling",
    //     location: {
    //       lat: coords.latitude,
    //       lng: coords.longitude,
    //     },
    //     radius: 20000,
    //   },
    //   (result, status, nextPageToken) => {
    //     if (!result) return;
    //     setPlaces((prev) => [...(prev ?? []), ...result]);
    //     console.log("placesService hasNextPage", nextPageToken?.hasNextPage);
    //     if (nextPageToken?.hasNextPage) {
    //       nextPageToken.nextPage();
    //     } else {
    //       setIsLoading(false);
    //     }
    //   },
    // );
  }, [placesService, coords]);

  if (!places) {
    return <></>;
  }

  if (isLoading) {
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
      <MapSideBar places={places} />
    </>
  );
};

const MapSideBar = ({
  places,
}: {
  places: google.maps.places.PlaceResult[];
}) => {
  console.log(places);
  return (
    <div className="absolute inset-y-0 bottom-0 right-0 flex w-[300px] flex-col gap-4 divide-y overflow-y-scroll bg-zinc-100 p-4 text-slate-700 dark:bg-zinc-900 dark:text-slate-300">
      {places.map((value, index) => (
        <div key={index}>
          <p>{value.name}</p>
        </div>
      ))}
    </div>
  );
};

const MapComponent = () => {
  const [coords, setLocation] = useState<GeolocationCoordinates>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLocation(coords);
      });
    }
  }, []);

  if (!coords) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-white">
        <div className="text-center text-3xl">Loading...</div>
        <Loader />
      </div>
    );
  }

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        mapId="454bad7cd35cc3fb"
        className="h-dvh"
        defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
        defaultZoom={12}
        gestureHandling={"greedy"}
        fullscreenControl={false}
        disableDefaultUI={true}
        style={{
          height: "auto",
          width: "auto",
        }}
      >
        <AdvancedMarker
          position={{ lat: coords.latitude, lng: coords.longitude }}
          title={"You are here!"}
        >
          <Pin
            background={"#22ccff"}
            borderColor={"#1e89a1"}
            glyphColor={"#0f677a"}
          />
        </AdvancedMarker>
        <Markers coords={coords} />
      </Map>
    </APIProvider>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
