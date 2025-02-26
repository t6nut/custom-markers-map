import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import "leaflet/dist/leaflet.css";

const useStore = create((set) => ({
	markers: [],
	addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
	updateMarker: (id, position) =>
		set((state) => ({
			markers: state.markers.map((marker) => (marker.id === id ? { ...marker, position } : marker)),
		})),
}));

const AddMarker = () => {
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

const MapComponent = () => {
	const { markers, updateMarker } = useStore();
	return (
		<MapContainer center={[59.437, 24.7536]} zoom={12} style={{ height: "70vh", width: "100%" }}>
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
				>
					<Popup>{marker.name}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

const MarkerList = () => {
	const { markers } = useStore();
	return (
		<ul>
			{markers.map((marker) => (
				<li key={marker.id}>
					{marker.name} - {marker.position?.lat.toFixed(4)}, {marker.position?.lng.toFixed(4)}
				</li>
			))}
		</ul>
	);
};

export default function App() {
	return (
		<div>
			<h1>Map Marker App</h1>
			<MapComponent />
			<h2>Marker List</h2>
			<MarkerList />
		</div>
	);
}
