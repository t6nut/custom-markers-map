import { create } from "zustand";

const loadMarkers = () => {
	const savedMarkers = localStorage.getItem('markers');
	return savedMarkers ? JSON.parse(savedMarkers) : [];
};

const saveMarkers = (markers) => {
	localStorage.setItem('markers', JSON.stringify(markers));
};

export const useStore = create((set) => ({
	markers: loadMarkers(),
	addMarker: (marker) => set((state) => {
		const newMarkers = [...state.markers, marker];
		saveMarkers(newMarkers);
		return { markers: newMarkers };
	}),
	updateMarker: (id, position) => set((state) => {
		const newMarkers = state.markers.map((marker) => (marker.id === id ? { ...marker, position } : marker));
		saveMarkers(newMarkers);
		return { markers: newMarkers };
	}),
	highlightMarker: (id) => set((state) => ({
		markers: state.markers.map((marker) => 
			marker.id === id ? { ...marker, isHighlighted: true } : marker
		),
	})),
	clearHighlight: () => set((state) => ({
		markers: state.markers.map((marker) => ({ ...marker, isHighlighted: false })),
	})),
}));