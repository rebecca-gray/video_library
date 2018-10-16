const express = require('express');
const router = express.Router();
const { Videos, AspectRatio, Type } = require("../models");

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
router.get('/video', function(req, res, next) {
  return Videos.find({email, password})
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
    .catch(err => cb(err));
});

// Have a GET endpoint that gives me a video by uuid, showing all the info about that video, including Metadata.
router.get('/video:uuid', function(req, res, next) {
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
router.get('/video:aspectRatio', function(req, res, next) {
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
