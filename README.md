# Map Marker App

## How to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/t6nut/react-map.git
   cd react-map
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm run dev
   ```
4. Open the application in your browser at:
   ```
   http://localhost:5173
   ```

## Project Structure

```
/ (Root Directory)
│── src/
│   ├── components/
│   │   ├── MapComponent.jsx  # Main map logic
│   │   ├── MarkerList.jsx    # Displays list of markers
│   │   ├── MarkerHandler.jsx # Handles marker interactions
│   │   ├── LocationSearch.jsx # Location search functionality
│   ├── styles/
│   │   ├── MapComponent.css
│   │   ├── MarkerList.css
│   │   ├── MarkerHandler.css
│   │   ├── LocationSearch.css
│   ├── App.js              # Main application component
│   ├── store.js            # Zustand store for managing markers
│── public/
│── package.json
│── README.md
```

## Key Features
- Interactive map using **React Leaflet**.
- Show user location if gps enabled/allowed
- User can add named markers by clicking on the map.
	- save markers to localStorage
	- click on marker to show name, coordinates and distance to user
	- Markers are draggable and their positions update dynamically.
- A list displays all markers with their names and coordinates.
	- remove markers from list
	- highlight selected markers on the map and list
- Location search bar to change map focus/location.
- Dark mode switch to use in low light conditions

## Decisions Made
1. **State Management:** Used **Zustand** instead of React Context or Redux to keep it lightweight and simple.
2. **Unique Marker IDs:** Used **UUID** to ensure each marker has a unique identifier.
3. **Draggable Markers:** Implemented event handlers to update positions when markers are moved.
4. **Save Markers to localStorage:** after refreshing or returning to the map the added markers are saved on user device
5. **Search location:** move to different location by name or coordinates if needed
6. **Minimal Dependencies:** Only necessary libraries are included to keep the project lightweight and easy to maintain.
7. **React Leaflet:** use react leaflet open source map for compatibility 
8. **Better visiblity:** different types and high contrast markers + hover and click effects 

