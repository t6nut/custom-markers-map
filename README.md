# Map Marker App
Imporvements:
* Choose marker color/type / change shape of markers from list

*** BUGS: ***
- markers are off-center from actual location (popup/coordinates show the right spot)

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
│   ├── styles/
│   │   ├── MapComponent.css
│   │   ├── MarkerList.css
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

* milliseid otsuseid töö käigus ette tuli? (koos põhjendusega)
## Decisions Made

1. **State Management:** Used **Zustand** instead of React Context or Redux to keep it lightweight and simple.
2. **Unique Marker IDs:** Used **UUID** to ensure each marker has a unique identifier.
3. **Draggable Markers:** Implemented event handlers to update positions when markers are moved.
4. **Minimal Dependencies:** Only necessary libraries are included to keep the project lightweight and easy to maintain.

