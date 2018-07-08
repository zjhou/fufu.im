const express = require('express');
const app = express();
app.use(express.static('dist'));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(8003, () => console.log('Example app listening on port 8002!'));
