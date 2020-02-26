const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.Location.findAll({
        include: [{ model: model.Project }, { model: model.Report }]
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Location.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Location.create(req.body).then((result) => {
        res.json(result);
    })
});
router.post('/odata/', function (req, res, next) {
    var parseOData = require("@wesselkuipers/odata-sequelize");
    var sequelize = require("sequelize");
    var query = parseOData(
        "$select=LocationName&$top=4&$filter=LocationName eq 'Basement'",
        sequelize
    );

    // Supposing you have your sequelize model
    model.Location.findAll(query).then((result) => {
        res.json(result);
    });
    // model.Location.create(req.body).then((result) => {
    //     res.json(result);
    // })
});
module.exports = router;