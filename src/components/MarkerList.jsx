import { useState } from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../store/store';
import '../styles/MarkerList.css';
import LocationSearch from './LocationSearch';

export const MarkerList = ({ map }) => {
	const { markers, highlightMarker, clearHighlight, removeMarker, setMapCenter } = useStore();
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className={`marker-list-container ${isVisible ? 'visible' : 'hidden'}`}>
			<button className='marker-list-container-button' onClick={toggleVisibility}>
				{isVisible ? 'Hide' : 'Show'} Menu
			</button>
			{isVisible && (
				<>
					<ul className="marker-list">
						<h4>Markers list</h4>
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
					<h4>Search location</h4>
					<LocationSearch map={map} />
				</>
			)}
		</div>
	);
};

MarkerList.propTypes = {
	map: PropTypes.object.isRequired,
};

