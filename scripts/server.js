// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
app.use(helmet());
app.use(compression());

app.use(helmet.contentSecurityPolicy({
    directives: {
      'connect-src': ["'self'", "https:"]
    }
  }));

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

const cors = require('cors');

const corsOptions = {
    origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200
  };

app.use(cors(corsOptions));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
