const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('website'));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
