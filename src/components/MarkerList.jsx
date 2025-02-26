import { useState } from 'react';
import { useStore } from '../store/store';
import './MarkerList.css';

export const MarkerList = () => {
	const { markers, highlightMarker, clearHighlight, removeMarker } = useStore();
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className={`marker-list-container ${isVisible ? 'visible' : 'hidden'}`}>
			<button onClick={toggleVisibility}>
				{isVisible ? 'Hide' : 'Show'} Markers
			</button>
			{isVisible && (
				<ul className="marker-list">
					{markers.map((marker) => (
						<li
							key={marker.id}
							onMouseEnter={() => highlightMarker(marker.id)}
							onMouseLeave={clearHighlight}
							className="marker-list-item"
						>
							{marker.name} - {marker.position?.lat.toFixed(4)}, {marker.position?.lng.toFixed(4)}
							<button onClick={() => removeMarker(marker.id)} className="remove-button">Remove</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
