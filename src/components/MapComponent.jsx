import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
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

export const MapComponent = () => {
	const { markers, updateMarker } = useStore();
	return (
		<MapContainer center={[59.437, 24.7536]} zoom={12} className="full-screen-map">
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<AddMarker />
			{markers.map((marker) => (
				<Marker
					key={marker.id}
					position={marker.position}
					draggable
					eventHandlers={{
						dragend: (e) => updateMarker(marker.id, e.target.getLatLng()),
					}}
					icon={L.divIcon({
						className: "custom-icon",
						html: `<div class="marker-icon ${marker.isHighlighted ? 'highlighted' : ''}"></div>`,
					})}
				>
					<Popup>{marker.name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

