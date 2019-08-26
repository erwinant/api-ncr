const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.ReportProgress.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus=1;
    model.ReportProgress.findAll({
        where: req.body
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    // model.ReportProgress.create(req.body).then((result) => {
    //     res.json(result);
    // }).catch(err=> {
    //     console.log(err);
    //   });
    model.ReportProgress.findOrCreate({ where: { Id: req.body.Id }, defaults: req.body }).then((result1) => {
        //res.json(result[0]);
        if (result1[1]) { // created
            res.json(result1[0]);
        } else {
            model.ReportProgress.update(req.body, { where: { Id: req.body.Id } }).then((updated) => {
                if (updated) {
                    model.ReportProgress.findAll({
                        where: { Id: req.body.Id }
                    }).then((result2) => {
                        res.json(result2[0]);
                    })
                }
            }).catch(errUpdated => {
                console.log(errUpdated);
            });
        }
    }).catch(err => {
        console.log(err);
    });
});
module.exports = router;