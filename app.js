const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
