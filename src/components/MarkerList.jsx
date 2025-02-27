import { useState } from 'react';
import { useStore } from '../store/store';
import '../styles/MarkerList.css';

export const MarkerList = () => {
	const { markers, highlightMarker, clearHighlight, removeMarker, setMapCenter } = useStore();
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className={`marker-list-container ${isVisible ? 'visible' : 'hidden'}`}>
			<button className='marker-list-container-button' onClick={toggleVisibility}>
				{isVisible ? 'Hide' : 'Show'} Markers
			</button>
			{isVisible && (
				<ul className="marker-list">
					{markers.map((marker) => (
						<li
							key={marker.id}
							onMouseEnter={() => highlightMarker(marker.id)}
							onMouseLeave={clearHighlight}
							onClick={() => setMapCenter(marker.position)}
							className={`marker-list-item ${marker.id === 'my-location' ? 'my-location' : ''} ${marker.isHighlighted ? 'highlighted' : ''}`}
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
