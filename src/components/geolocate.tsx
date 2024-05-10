import { Loader, Rating } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { TbArrowBack } from "react-icons/tb";
import QRCode from "react-qr-code";
import { env } from "~/env";
import { api } from "~/utils/api";
import InfoMarker from "./Markers";
import { CustomModal } from "./userModal";

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
        if (nextPageToken?.hasNextPage) {
          nextPageToken.nextPage();
        } else {
          setIsLoading(false);
        }
      },
    );
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
      <MapSideBar places={places} coords={coords} />
    </>
  );
};

const MapSideBar = ({
  places,
  coords,
}: {
  places: google.maps.places.PlaceResult[];
  coords: GeolocationCoordinates;
}) => {
  const map = useMap();
  const {
    data: preferredTravelType,
    isStale,
    refetch,
  } = api.user.getProfilePreferredTravelType.useQuery();

  const { mutate: mutateAddOffsetFootprint } =
    api.user.addOffsetFootprint.useMutation();
  const [isFolded, setIsFolded] = useState(false);
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const travelMode = useRef<google.maps.TravelMode>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [place, setPlace] = useState<google.maps.places.PlaceResult>();
  const [opened, { open, close }] = useDisclosure();
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({ map, suppressMarkers: true }),
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (isStale) {
      void refetch();
    }
  }, [isStale, refetch]);

  useEffect(() => {
    if (!preferredTravelType) return;

    switch (preferredTravelType.preferred_travel_type) {
      case "Bicycling": {
        travelMode.current = google.maps.TravelMode.BICYCLING;
        break;
      }
      case "Driving": {
        travelMode.current = google.maps.TravelMode.DRIVING;
        break;
      }
      case "Transit": {
        travelMode.current = google.maps.TravelMode.TRANSIT;
        break;
      }
      case "Walking": {
        travelMode.current = google.maps.TravelMode.WALKING;
        break;
      }
    }
  }, [preferredTravelType]);

  if (!preferredTravelType) {
    return <></>;
  }

  return (
    <>
      <CustomModal opened={opened} onClose={close} title="Scan QR Code">
        <div className="flex flex-col items-center justify-center gap-4">
          <QRCode
            value={
              "https://www.google.com/maps/dir/?api=1&" +
              `origin=${coords.latitude},${coords.longitude}&destination=${place?.geometry!.location!.lat()},${place?.geometry!.location!.lng()}&travelmode=${travelMode.current!}&destination_place_id=${place?.place_id}`
            }
          />
          <p>Scan the QR code to open in google maps</p>
        </div>
      </CustomModal>
      {isFolded ? (
        <div className="absolute inset-y-0 bottom-0 right-0 flex transform flex-col gap-4 divide-y overflow-y-scroll bg-zinc-100 p-4 text-slate-700 duration-100 data-[fold=false]:w-4/12 data-[fold=true]:w-[300px] dark:bg-zinc-900 dark:text-slate-300">
          <div className="flex h-full w-full flex-col gap-4">
            <button
              onClick={() => {
                setIsFolded((prev) => !prev);
              }}
              className="flex flex-row items-center gap-2"
            >
              back
              <TbArrowBack />
            </button>
            <p className="font-bold">{place?.name}</p>
            <Rating value={place?.rating} fractions={2} readOnly />
            <p>{place?.vicinity}</p>
            <p>Distance: {routes[0]?.legs[0]?.distance?.text}</p>

            <button
              className="flex justify-self-end last:mt-auto"
              onClick={() => {
                open();
                setHasClicked(true);
                mutateAddOffsetFootprint({
                  travelType: preferredTravelType.preferred_travel_type!,
                  miles: routes[0]!.legs[0]!.distance!.value,
                });
              }}
              disabled={hasClicked}
            >
              Choose Route
            </button>
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-y-0 bottom-0 right-0 flex transform flex-col gap-4 divide-y overflow-y-scroll bg-zinc-100 p-4 text-slate-700 duration-100 data-[fold=false]:w-4/12 data-[fold=true]:w-[300px] dark:bg-zinc-900 dark:text-slate-300"
          data-fold={isFolded}
        >
          {places.map((value, index) => (
            <div key={index}>
              <p className="font-bold">{value.name}</p>
              <Rating value={value.rating} fractions={2} readOnly />
              <p>{value.vicinity}</p>
              <div className="flex flex-row gap-4">
                <button
                  className="text-slate-700 dark:text-slate-300"
                  onClick={() => {
                    directionsService!
                      .route({
                        origin: coords.latitude + "," + coords.longitude,
                        destination:
                          value.geometry!.location!.lat() +
                          "," +
                          value.geometry!.location!.lng(),
                        travelMode: travelMode.current!,
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                      })
                      .then((result) => {
                        console.log(result);
                        setRoutes(result.routes);
                        directionsRenderer!.setDirections(result);
                        setIsFolded(true);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    setPlace(value);
                  }}
                >
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
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
