const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

let players = {}; // Храним данные по ID или типу

app.post('/update', (req, res) => {
    const { players } = req.body;
    if (players && Array.isArray(players)) {
        players.forEach(p => {
            // Сохраняем каждого по ID: 0-я, остальное враги/тимейты
            allPlayers[p.id] = { x: p.x, z: p.z, t: p.t, lastUpdate: Date.now() };
        });
    }
    res.sendStatus(200);
});



app.get('/data', (req, res) => {
    // Удаляем тех, кто не обновлялся больше 5 секунд (вышли из игры)
    const now = Date.now();
    for (let id in players) {
        if (now - players[id].lastUpdate > 5000) delete players[id];
    }
    res.json(Object.values(players));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Radar on port ${PORT}`));
