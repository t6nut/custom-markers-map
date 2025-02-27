import { useState } from "react";
import { useMap } from "react-leaflet";
import { useStore } from "../store/store";
import "../styles/LocationSearch.css";

const LocationSearch = () => {
	const map = useMap();
	const { setMapCenter } = useStore();
	const [query, setQuery] = useState("");

	const handleSearch = async (e) => {
		e.preventDefault();
		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
		const results = await response.json();
		if (results.length > 0) {
			const { lat, lon } = results[0];
			const position = { lat: parseFloat(lat), lng: parseFloat(lon) };
			setMapCenter(position);
			map.setView(position, 12);
		}
	};

	return (
		<form className="location-search" onSubmit={handleSearch}>
			<input
				type="text"
				placeholder="Search location"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type="submit">Go</button>
		</form>
	);
};

export default LocationSearch;
