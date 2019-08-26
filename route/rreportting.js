const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.uv_report1.findAll({
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    model.uv_report1.findAll({
        where: req.body,
        order: [
            ['CreateDate', 'ASC']
        ]
    },
    ).then((result) => {
        res.json(result);
    })
});
module.exports = router;