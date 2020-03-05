const axios = require('axios');
const express = require('express');
const router = express.Router();


// router.post ('/save', async (req, res, next) => {
//     const response = await axios.post('http://localhost:9000/save', {...req.body} );
//     const data =
//     console.log(response.config.data);
//     res.status('201').send('saved');
// });

router.post('/fetch', async(req, res, next) => {
    const response = await axios.post('http://localhost:9000/fetch', {...req.body} );
    const data = response.data;
    console.log(response.data);
    res.status('200').send(data);
});

module.exports = router;