import express from 'express';

const router = express.Router();

const REDIRECT_URI = 'http://localhost:8080/callback';
const CLIENT_ID = 'c8f854adc72e47de8a412d4ddbbcc351';
const CLIENT_SECRET = 'b78a2cff9ea7439fb85fb09df8d481ee';

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

router.get('/login', (req, res) => {
  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(url);
});

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