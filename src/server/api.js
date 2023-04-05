// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(helmet());
app.use(compression());

const cors = require('cors');
app.use(cors());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';
app.use(express.static(DIST_DIR));

app.use('/^(?!\/api).+/', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});
app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);


const jsforce = require('jsforce');
const oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
     loginUrl : 'https://login.salesforce.com',
    clientId : '3MVG9ux34Ig8G5eo69lXF2jdlWctP3DHEpmXsEbB13BJ5WzXfzFF1XZBBxX44fKN1N4G8jegw5yI0XURUSfT6',
    clientSecret : 'ED5B3198DB229E3EC1CFF0387C861D82046406D36740F873FC9D927047A5FF0A',
    redirectUri : 'https://localhost:3001/oauth2/callback'

});
app.get('/api/authenticate', function(req, res) {
    console.log('new update')
    res.redirect(oauth2.getAuthorizationUrl({ scope : 'api' }));
  });

  app.get('/oauth2/callback', function(req, res) {
    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    const code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
      if (err) { return console.error(err); }
      // Now you can get the access token, refresh token, and instance URL information.
      // Save them to establish connection next time.
      console.log(conn.accessToken);
      console.log(conn.refreshToken);
      console.log(conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      // ...
      res.send('success'); // or your desired response
    });
  });
