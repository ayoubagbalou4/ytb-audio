import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [title, setTitle] = useState("");

  const play = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/audio", {
        url,
      });

      setAudio(res.data.audio);
      setTitle(res.data.title);
    } catch (err) {
      alert("Unable to load audio.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        {/* <h1>YouTube Audio Player</h1> */}
        {/* <p>Paste a YouTube link and listen without the video.</p> */}

        <div className="search-box">
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button onClick={play}>▶</button>
        </div>

        {audio && (
          <div className="player">
            <audio controls autoPlay src={audio}></audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;