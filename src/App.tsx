import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer-section/footer.tsx";
import SpotifyPlayer from "./components/spotify-player/spotify-player.tsx";
import Introduction from "./components/introduction-section/introduction.tsx";

function App() {

  const [track, setTrack] = useState('3s44Qv8x974tm0ueLexMWN?si=f73a98ae99a04fdb');
  return (
    <div className="App">
      <div className="section" id="section1">
        <Introduction />
      </div>
      <div className="section" id="section2">
        <h1>Section 2</h1>
        <p>This is the second section.</p>
      </div>
      <div className="section" id="section3">
        <Footer
          setTrackId={setTrack}
          trackId={track}
        />
      </div>
    </div>
  );
}

export default App;
