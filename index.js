const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const repoOwner = 'ruingl';
const repoName = 'Yue'; // Replace with your GitHub Pages repository name

// Configure Express Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
  res.render('home');
});

app.get('/docs', async (req, res) => {
  res.render('docs');
});

app.get('/version', async (req, res) => {
  try {
    const releases = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);
    const latestVersion = releases.data.tag_name;
    res.send({ version: latestVersion });
  } catch (error) {
    console.error('Error fetching latest version:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});