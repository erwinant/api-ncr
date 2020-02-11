const model = require('../models/index');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', function (req, res, next) {
    model.Users.findAll({
        include: [{ model: model.Project }]
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Users.findAll({
        attributes: { exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy', 'RowStatus'] },
        where: req.body,
        include: [{ model: model.Project }]
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Users.create(req.body).then((result) => {
        res.json(result);
    })
});

router.put('/', function (req, res, next) {
    model.Users.update(req.body, { where: { Username: req.body.Username } }).then((result) => {
        res.json(result);
    }
    )
});


module.exports = router;