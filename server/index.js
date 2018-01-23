import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import request from 'request';
import querystring from 'querystring';

import { DATABASE_URL, PORT } from './config';
import Record from './models/record';
import routes from './routes';

const app = express();
app.use('/', routes);
app.use(bodyParser.json());
app.use(express.static(process.env.CLIENT_PATH || 'build/dev/client/'));

const runServer = (callback) => {
  mongoose.connect(DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}.`);
      if (callback) {
        callback();
      }
    })
  })
}

if (require.main === module) {
  runServer((err) => {
    if (err) {
      console.error(err);
    }
  });
}

export { app as app, runServer as runServer };