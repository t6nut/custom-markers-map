import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from "react-leaflet";
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

const MarkerHandler = ({ marker, updateMarker, highlightMarker, clearHighlight, markers, lines, setLines, distances, setDistances }) => {
	const map = useMap();

	const handleMarkerClick = () => {
		clearHighlight();
		highlightMarker(marker.id);

		const myLocationMarker = markers.find((m) => m.id === 'my-location');
		if (!myLocationMarker) return;

		const lineKey = `${marker.id}-${myLocationMarker.id}`;
		const distance = map.distance(marker.position, myLocationMarker.position);
		setLines([...lines, lineKey]);
		setDistances((prevDistances) => ({
			...prevDistances,
			[lineKey]: distance,
		}));
	};

	const handlePopupClose = () => {
		const myLocationMarker = markers.find((m) => m.id === 'my-location');
		if (!myLocationMarker) return;

		const lineKey = `${marker.id}-${myLocationMarker.id}`;
		setLines(lines.filter((line) => line !== lineKey));
		setDistances((prevDistances) => {
			const newDistances = { ...prevDistances };
			delete newDistances[lineKey];
			return newDistances;
		});
	};

	return (
		<Marker
			key={marker.id}
			position={marker.position}
			draggable
			eventHandlers={{
				dragend: (e) => updateMarker(marker.id, e.target.getLatLng()),
				click: handleMarkerClick,
			}}
			icon={L.divIcon({
				className: "custom-icon",
				html: `<div class="marker-icon ${marker.id === 'my-location' ? 'my-location' : ''} ${marker.isHighlighted ? 'highlighted' : ''}"></div>`,
			})}
		>
			<Popup onClose={handlePopupClose}>
				<div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{marker.name}</div>
				<div style={{ fontSize: '0.8em' }}>{marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}</div>
				{distances[`${marker.id}-my-location`] && (
					<div>Distance to: {distances[`${marker.id}-my-location`].toFixed(2)} meters</div>
				)}
			</Popup>
		</Marker>
	);
};

MarkerHandler.propTypes = {
	marker: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string,
		position: PropTypes.object.isRequired,
		isHighlighted: PropTypes.bool,
	}).isRequired,
	updateMarker: PropTypes.func.isRequired,
	highlightMarker: PropTypes.func.isRequired,
	clearHighlight: PropTypes.func.isRequired,
	markers: PropTypes.array.isRequired,
	lines: PropTypes.array.isRequired,
	setLines: PropTypes.func.isRequired,
	distances: PropTypes.object.isRequired,
	setDistances: PropTypes.func.isRequired,
};

export const MapComponent = () => {
	const { markers, updateMarker, setUserLocation, highlightMarker, clearHighlight } = useStore();
	const [darkMode, setDarkMode] = useState(false);
	const [lines, setLines] = useState([]);
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
				{markers.map((marker) => (
					<MarkerHandler
						key={marker.id}
						marker={marker}
						updateMarker={updateMarker}
						highlightMarker={highlightMarker}
						clearHighlight={clearHighlight}
						markers={markers}
						lines={lines}
						setLines={setLines}
						distances={distances}
						setDistances={setDistances}
					/>
				))}
				{lines.map((lineKey) => {
					const [markerId, myLocationId] = lineKey.split('-');
					const marker = markers.find((m) => m.id === markerId);
					const myLocationMarker = markers.find((m) => m.id === myLocationId);
					if (!marker || !myLocationMarker) return null;
					return (
						<Polyline
							key={lineKey}
							positions={[marker.position, myLocationMarker.position]}
							color="blue"
						/>
					);
				})}
			</MapContainer>
			<div className="dark-mode-switch">
				<button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
			</div>
		</div>
	);
};

export default MarkerHandler;