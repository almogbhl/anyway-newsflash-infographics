import React, { FC } from 'react';
import { Map } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import { getAPIKey, uniquePoints } from '../../utils/utils';
import { IPoint } from '../../models/Point';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import AnywayMostSevereAccidentsMarker from '../atoms/AnywayMostSevereAccidentsMarker'
const INITIAL_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM!);
const WRAPPER_STYLES = { height: '100%', width: '100%' };
const DEFAULT_BOUNDS = [
  L.latLng(29.5, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

interface IProps {
  items: IPoint[] | any ;
  center?: { lat: number; lng: number; };
}

const LocationMap: FC<IProps> = ( { items, center } ) => {
  let markers = items.map((x: IPoint, i: number) => {
    if ( x.latitude !== null && x.longitude !== null ) {
      let toolTipRight = ( i % 2 === 0 ) ? true : false;
      return (
        <div key={i}>
          <AnywayMostSevereAccidentsMarker markerdata={ x } markerside={ toolTipRight } />
        </div>
      );
    }
    return null;
  });
  const bounds = getBounds(items);

  return (
    <Map center={center} bounds={bounds} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
      <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: getAPIKey(), VERSION: '3.40.6' }} type="terrain" />
      {markers}
    </Map>
  );
};

// get bounding box for collection of points
const getBounds = (items: IPoint[]) => {
  let bound: LatLng[] = DEFAULT_BOUNDS;
  let points = uniquePoints(items);
  if (points.length === 1) {
    // single point provided
    const p = points[0];
    bound = [L.latLng(p.latitude + 0.01, p.longitude + 0.01), L.latLng(p.latitude - 0.01, p.longitude - 0.01)];
  } else if (points.length > 1) {
    bound = points.map((p) => L.latLng(p.latitude, p.longitude));
  }

  return L.latLngBounds(bound);
};
export default LocationMap;
