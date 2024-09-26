const express = require('express'); // Express-Modul einbinden
const app = express(); // Express-App erstellen

// Route zum Klingeln
app.get('/ring', (req, res) => {
  console.log('Ring Bell'); // Ausgabe in der Konsole
  res.send('Ring Bell'); // Antwort an den Client
});

// Server läuft auf Port 3000
app.listen(3000, () => { // Server starten
  console.log('Server started at http://localhost:3000');
});