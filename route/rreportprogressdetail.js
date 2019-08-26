const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.ReportProgressDetail.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    if (req.body.aggr === "max") {
        // model.ReportProgressDetail.findAll({
        //     where: req.body,
        //     attributes:[[sequelize.fn('max', sequelize.col('Id')),'max']] }).then((result) => {
        //     res.json(result);
        // })
        model.ReportProgressDetail.max('Id', { where: { ReportProgressID: req.body.ReportProgressID } }).then((result) => {
            if (result) {
                model.ReportProgressDetail.findAll({ where: { Id: result } }).then((resultObj) => {
                    res.json(resultObj);
                })
            }else{
                res.json(result);
            }
        }).catch(err => {
            res.statusCode(500);
            res.json("Something Error");
        })
    }
    else {
        req.body.RowStatus=1;
        model.ReportProgressDetail.findAll({ where: req.body }).then((result) => {
            res.json(result);
        })
    }

});
router.post('/', function (req, res, next) {
    model.ReportProgressDetail.create(req.body).then((result) => {
        res.json(result);
    }).catch(err => {
        res.statusCode(500);
        res.json("Something Error");
    })
});

router.put('/', function (req, res, next) {
    model.ReportProgressDetail.update(req.body, { where: { Id: req.body.Id } }).then((updated) => {
        if (updated) {
            model.ReportProgressDetail.findAll({
                where: { Id: req.body.Id }
            }).then((result) => {
                res.json(result[0]);
            })
        }
    }).catch(err => {
        res.statusCode(500);
        res.json("Something Error");
    })
});
module.exports = router;