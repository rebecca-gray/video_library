const express = require('express');
const router = express.Router();
const { Video, AspectRatio, Type } = require("../models");

const getShortData = (video) => {
    const data = {
        title: video.title,
        author: video.author,
        description: video.description,
        id: video.id,
    };
    return data;
};

// Have a GET endpoint that lists videos, grouped by 5 so I have to paginate.
router.get('/:page', (req, res) => {
    let limit = 5;   // number of records per page
    let offset = 0;
    Video.findAndCountAll()
    .then((data) => {
        let page = req.params.page;      // page number
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        Video.findAll({
            attributes: ['id', 'title', 'author', 'description', 'video'],
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        })
        .then((videos) => {
            res.status(200).json({'result': videos, 'count': data.count, 'pages': pages});
        });
    })
    .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
    });

// Have a GET endpoint that gives me a video by uuid, showing all the info about that video, including Metadata.
router.get('/uuid', function(req, res, next) {
  return Videos.findOne({id: uuid})
     .then(video => {
         if (!video) {
             return cb(null, false, {message: 'no Video matching that id.'});
         }
         res.send({ video });
    })
    .catch(err => cb(err));
});

// Have a GET endpoint so I can see videos with a certain aspect ratio.
router.get('/aspectRatio', function(req, res, next) {
  return Videos.find({ aspectRatio })
     .then(videos => {
         if (!videos) {
             return cb(null, false, {message: 'no Videos.'});
         }
         const data = [];
         videos.forEach((video) => {
           data.push(getShortData(video));
         });
         res.send({ data });
    })
    .catch(err => cb(err));});

/* GET video listing. */

module.exports = router;
