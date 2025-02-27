import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../store/store";
import "leaflet/dist/leaflet.css";
import "../styles/MapComponent.css";

export const AddMarker = () => {
	const addMarker = useStore((state) => state.addMarker);
	useMapEvents({
		click(e) {
			const name = prompt("Enter marker name:");
			if (name) {
				addMarker({ id: uuidv4(), name, position: e.latlng });
			}
		},
	});
	return null;
};

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

export const MapComponent = () => {
	const { markers, updateMarker, setUserLocation, highlightMarker, clearHighlight } = useStore();
	const [darkMode, setDarkMode] = useState(false);

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

	const handleMarkerClick = (id) => {
		clearHighlight();
		highlightMarker(id);
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
				{markers.map((marker) => (
					<Marker
						key={marker.id}
						position={marker.position}
						draggable
						eventHandlers={{
							dragend: (e) => updateMarker(marker.id, e.target.getLatLng()),
							click: () => handleMarkerClick(marker.id),
						}}
						icon={L.divIcon({
							className: "custom-icon",
							html: `<div class="marker-icon ${marker.id === 'my-location' ? 'my-location' : ''} ${marker.isHighlighted ? 'highlighted' : ''}"></div>`,
						})}
					>
						<Popup>{marker.name}</Popup>
					</Marker>
				))}
			</MapContainer>
			<div className="dark-mode-switch">
				<button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
			</div>
		</div>
	);
};

