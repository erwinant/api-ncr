const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.Pic.findAll({
        include: [{ model: model.Project }]
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus=1;
    model.Pic.findAll({
        where: req.body,
        include: [{ model: model.Project }]
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Pic.create(req.body).then((result) => {
        res.json(result);
    })
});
module.exports = router;