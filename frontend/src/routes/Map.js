import React, { useEffect, useState } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedStore} from "../actions/actions";

function MapContainer(props) {
    const [userLocation, setUserLocation] = useState(null);
    const allLocations = useSelector(state => state.store.locations);
    const filter = useSelector(state => state.store.filter);
    const selectedStore = useSelector(state => state.store.selected);
    const storeLocation = (props.match && props.match.params.lat && props.match.params.lng) ? { lat: parseFloat(props.match.params.lat), lng: parseFloat(props.match.params.lng) } : null;
    const locations = filter ? allLocations.filter((location) => location.name.toUpperCase().includes(filter.toUpperCase())) : allLocations;

    const dispatch = useDispatch();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => setUserLocation(
                {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            ));
        }
    }, []);

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter = {selectedStore ? { lat: selectedStore.latitude, lng: selectedStore.longitude } : storeLocation ? {...storeLocation} : { ...userLocation }}
            defaultZoom = { 11 }
        >
            {props.markers.length && props.markers.map((marker) => (
                <>
                    <Marker
                        onClick={() => dispatch(setSelectedStore(marker))}
                        key={marker.number}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                    >
                        {selectedStore && selectedStore.number === marker.number &&
                            <InfoWindow>
                                <div>{marker.name}</div>
                            </InfoWindow>
                        }
                    </Marker>
                </>
            ))}
        </GoogleMap>
    ));
    return(
        <div>
            <GoogleMapExample
                isMarkerShown
                markers={locations}
                containerElement={ <div style={{ height: `90vh`, width: 'auto' }} /> }
                mapElement={ <div style={{ height: `90vh` }} /> }
            />
        </div>
    );
}

export default MapContainer;
