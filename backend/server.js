const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    res.json({
        "message": "Server is running"
    });
})

app.post("/api/audio", async (req, res) => {
    try {
        const { url } = req.body;

        const info = await ytdlp(url, {
            dumpSingleJson: true,
            format: "bestaudio"
        });

        res.json({
            title: info.title,
            audio: info.url
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Failed to get audio"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running");
});