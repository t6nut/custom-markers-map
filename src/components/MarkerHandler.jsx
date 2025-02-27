import PropTypes from 'prop-types';
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../store/store";
import L from "leaflet";

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

export const MarkerHandler = ({ marker, updateMarker, highlightMarker, clearHighlight, markers, distances, setDistances }) => {
	const map = useMap();

	const handleMarkerClick = () => {
		clearHighlight();
		highlightMarker(marker.id);

		const myLocationMarker = markers.find((m) => m.id === 'my-location');
		if (!myLocationMarker) return;

		const distance = map.distance(marker.position, myLocationMarker.position);
		setDistances((prevDistances) => ({
			...prevDistances,
			[marker.id]: distance,
		}));
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
			<Popup>
				<div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{marker.name}</div>
				<div style={{ fontSize: '0.8em' }}>{marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}</div>
				{distances[marker.id] && (
					<div>Distance: {distances[marker.id].toFixed(0)}m</div>
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
	distances: PropTypes.object.isRequired,
	setDistances: PropTypes.func.isRequired,
};

export default MarkerHandler;
