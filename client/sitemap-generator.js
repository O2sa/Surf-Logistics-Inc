const router = require('./src/App'); // Import your router
const { createSitemap } = require('react-router-sitemap');
const routes = require('./src/routes'); // Path to your routes definition

const sitemap = createSitemap({
  // You can pass your routes and domain here
  base: 'https://yourwebsite.com',
  routes: routes, // Add your route array
});

// Save the sitemap to a file
sitemap.toXML().then((xml) => {
  const fs = require('fs');
  fs.writeFileSync('public/sitemap.xml', xml);
});
