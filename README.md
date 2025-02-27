# Map Marker App
Imporvements:
* Choose marker color/type / change shape of markers from list
* Choose another (default) city/location

*** BUGS: ***
- markers are off-center from actual location (popup/coordinates show the right spot)

nice to have:
when zooming out, let markers resize smaller (so no collision) or change to 1 big marker button with the count of small markers, and when clicked on zoom to scale


## How to Run

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Project Structure

```
/ (Root Directory)
│── src/
│   ├── components/
│   │   ├── MapComponent.jsx  # Main map logic
│   │   ├── MarkerList.jsx    # Displays list of markers
│   ├── styles/
│   │   ├── MapComponent.css  # Main map logic
│   │   ├── MarkerList.css    # Displays list of markers
│   ├── App.js              # Main application component
│   ├── store.js            # Zustand store for managing markers
│── public/
│── package.json
│── README.md
```

## Key Features
- Interactive map using **React Leaflet**.
- Users can add named markers by clicking on the map.
- Markers are draggable and their positions update dynamically.
- A list displays all markers with their names and coordinates.

## Decisions Made

1. **State Management:** Used **Zustand** instead of React Context or Redux to keep it lightweight and simple.
2. **Unique Marker IDs:** Used **UUID** to ensure each marker has a unique identifier.
3. **Draggable Markers:** Implemented event handlers to update positions when markers are moved.
4. **Minimal Dependencies:** Only necessary libraries are included to keep the project lightweight and easy to maintain.

