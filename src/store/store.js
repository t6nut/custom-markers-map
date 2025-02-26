import { create } from "zustand";

export const useStore = create((set) => ({
	markers: [],
	addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
	updateMarker: (id, position) =>
		set((state) => ({
			markers: state.markers.map((marker) => (marker.id === id ? { ...marker, position } : marker)),
		})),
	highlightMarker: (id) => set((state) => ({
		markers: state.markers.map((marker) => 
			marker.id === id ? { ...marker, isHighlighted: true } : marker
		),
	})),
	clearHighlight: () => set((state) => ({
		markers: state.markers.map((marker) => ({ ...marker, isHighlighted: false })),
	})),
}));