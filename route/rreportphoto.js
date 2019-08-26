const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.ReportPhoto.findAll({}).then(result =>{
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus=1;
    model.ReportPhoto.findAll({where:req.body}).then((result)=> {
        res.json(result);
      })
});
router.post('/', function (req, res, next) {
    model.ReportPhoto.create(req.body).then((result)=> {
        res.json(result);
      })
});
module.exports = router;