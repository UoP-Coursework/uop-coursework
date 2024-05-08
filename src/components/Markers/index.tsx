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
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={() => setInfoWindowOpen(true)}
      >
        {infoWindowOpen && (
          <InfoWindow
            anchor={marker}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            {content}
          </InfoWindow>
        )}
      </AdvancedMarker>
    </>
  );
};

export default InfoMarker;
