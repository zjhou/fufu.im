const express = require('express');
const app = express();
const port = 8003;
app.use(express.static('dist'));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app is listening on port ${port}!`));
