import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useStore } from "../store/store";
import { AddMarker, MarkerHandler } from "./MarkerHandler";
import "leaflet/dist/leaflet.css";
import "../styles/MapComponent.css";
import { MarkerList } from "./MarkerList";

const CenterMap = () => {
	const map = useMap();
	const { mapCenter } = useStore();
	useEffect(() => {
		map.setView(mapCenter);
	}, [mapCenter, map]);
	return null;
};

const ZoomLevelDisplay = () => {
	const map = useMap();
	const [zoomLevel, setZoomLevel] = useState(map.getZoom());

	useEffect(() => {
		const onZoomEnd = () => {
			setZoomLevel(map.getZoom());
		};
		map.on('zoomend', onZoomEnd);
		return () => {
			map.off('zoomend', onZoomEnd);
		};
	}, [map]);

	return (
		<div className="zoom-level-display">
			Zoom Level: {zoomLevel}
		</div>
	);
};

const CursorCoordinates = () => {
	const [coords, setCoords] = useState({ lat: 0, lng: 0 });

	useMapEvents({
		mousemove(e) {
			setCoords(e.latlng);
		},
	});

	return (
		<div className="cursor-coordinates" style={{ position: 'absolute', pointerEvents: 'none' }}>
			{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
		</div>
	);
};

export const MapComponent = () => {
	const { markers, updateMarker, setUserLocation, highlightMarker, clearHighlight } = useStore();
	const [darkMode, setDarkMode] = useState(false);
	const [distances, setDistances] = useState({});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setUserLocation({ lat: latitude, lng: longitude });
			});
		}
	}, [setUserLocation]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<div className="map-container">
			<MapContainer center={[59.437, 24.7536]} zoom={12} className="full-screen-map">
				<TileLayer
					url={darkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
				/>
				<AddMarker />
				<CenterMap />
				<ZoomLevelDisplay />
				<CursorCoordinates />
				{markers.map((marker) => (
					<MarkerHandler
						key={marker.id}
						marker={marker}
						updateMarker={updateMarker}
						highlightMarker={highlightMarker}
						clearHighlight={clearHighlight}
						markers={markers}
						distances={distances}
						setDistances={setDistances}
					/>
				))}
				<MarkerList />
			</MapContainer>
			<div className="dark-mode-switch">
				<button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
			</div>
		</div>
	);
};