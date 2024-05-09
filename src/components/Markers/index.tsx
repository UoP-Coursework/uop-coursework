import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState, type ReactNode } from "react";

const InfoMarker = ({
  position,
  content,
}: {
  position: google.maps.LatLng;
  content: ReactNode;
}) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={() => setInfoWindowOpen((prev) => !prev)}
      />
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          {content}
        </InfoWindow>
      )}
    </>
  );
};

export default InfoMarker;
