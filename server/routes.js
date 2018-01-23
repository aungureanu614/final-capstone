import express from 'express';
import request from 'request';

import Record from './models/record';
import auth from './auth';

const router = express.Router();

router.post('/rating', (req, res) => {
  const options = {upsert: true, returnNewDocument: true};

  Record.findOneAndUpdate({name: req.body.name}, {$push: {rating:req.body.rating}}, options, (err, item) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    res.status(201).json(item);
  });
});

router.get('/rating/:name', (req, res) => {
  const name = req.params.name;

  Record.find({name: name}, (err, item) => {
    if (item){
      res.json(item);
    } else {
     res.json({});
    }
  });
});

// Get access token
router.get('/login', (req, res) => {
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${auth.CLIENT_ID}&redirect_uri=${encodeURIComponent(auth.REDIRECT_URI)}`;
  res.redirect(url);
});

// Refresh access token
router.get('/refreshToken/:token', (req, res) => {
  const body = {
    grant_type: 'refresh_token',
    refresh_token: req.params.token
  };

  const authKey = Buffer.from(`${auth.CLIENT_ID}:${auth.CLIENT_SECRET}`).toString('base64');

  const headers = {
    'Authorization': `Basic ${authKey}`
  };

  request.post({
    url: 'https://accounts.spotify.com/api/token',
    form: body,
    headers: headers,
    json: true
  }, (error, response, body) => {
    res.json(body);
  });
});

// Return access token
router.get('/callback', (req, res) => {
  const body = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  request.post({
    url: 'https://accounts.spotify.com/api/token',
    form: body,
    json: true
  }, (error, response, body) => {
    res.json(body);
  });
});

export default router;