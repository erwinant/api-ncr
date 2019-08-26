const model = require('../models/index');
var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
const Op = Sequelize.Op;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
router.get('/', function (req, res, next) {
    model.Report.findAll({
        include: [
            { model: model.ReportPhoto, where: { RowStatus: 1 } },
            { model: model.ReportProgress, where: { RowStatus: 1 } },
            { model: model.uv_sla }
        ],
        order: [
            ['Id', 'DESC']
        ]
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    if (req.body.Op === "OR") {
        model.Report.findAll({
            where: {
                [Op.or]: req.body.Prop
            },
            include: [
                { model: model.ReportPhoto, where: { RowStatus: 1 } },
                { model: model.uv_sla },
                { model: model.ReportProgress },
                { model: model.Project, where: { RowStatus: 1 } },
                { model: model.Location, where: { RowStatus: 1 } }
            ],
            order: [
                ['Id', 'DESC']
            ]
        }).then((result) => {
            res.json(result);
        })
    } else {
        req.body.RowStatus = 1;
        model.Report.findAll({
            where: req.body,
            include: [
                { model: model.ReportPhoto, where: { RowStatus: 1 } },
                { model: model.uv_sla },
                { model: model.ReportProgress },
                { model: model.Project, where: { RowStatus: 1 } },
                { model: model.Location, where: { RowStatus: 1 } }
            ],
            order: [
                ['Id', 'DESC']
            ]
        }).then((result) => {
            res.json(result);
        })
    }
});

router.post('/', function (req, res, next) {
    sequelize.query("EXEC up_upsertReport :Id,:RowStatus,:ProjectID,:LocationID,:RootCause,:Matters,:ReportBy,:Description,:Scope,:LocationDetail,:Notes,:Founder,:SLA,:TotalCost,:ActionBy,:ReportStatus,:SLADesc,:AssignDate,:FinishDate,:Pic,:DelayCause,:CloseDate",
        { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(result => {
            if (req.body.ReportPhotos.length > 0) {
                for (let i = 0; i < req.body.ReportPhotos.length; i++) {
                    let objImg = {
                        RowStatus: 1,
                        Filename: req.body.ReportPhotos[i],
                        ReportID: result[0].Id
                    }
                    model.ReportPhoto.create(objImg).then((resultPhoto) => {

                    })
                }
            }
            res.json(result);
        })
});

router.put('/', function (req, res, next) {
    sequelize.query("EXEC up_upsertReportOnly :Id,:RowStatus,:ProjectID,:LocationID,:RootCause,:Matters,:ReportBy,:Description,:Scope,:LocationDetail,:Notes,:Founder,:SLA,:TotalCost,:ActionBy,:ReportStatus,:SLADesc,:AssignDate,:FinishDate,:Pic,:DelayCause,:CloseDate,:PreventiveAction,:CorrectiveAction  ",
        { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(result => {
            if (req.body.ReportPhotos.length > 0) {
                for (let i = 0; i < req.body.ReportPhotos.length; i++) {
                    let objImg = {
                        RowStatus: 1,
                        Filename: req.body.ReportPhotos[i],
                        ReportID: result[0].Id
                    }
                    model.ReportPhoto.create(objImg).then((resultPhoto) => {

                    })
                }
            }
            
            
            res.json(result);
        })
});

router.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    const uuidv1 = require('uuid/v1');

    if (req.files.image) {
        let myfile = req.files.image;
        let ftype = myfile.mimetype.split('/')[1];
        let storage = config.folderImage;
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(storage + myfile.name, function (err) {
            if (err)
                return res.status(500).send(err);
            res.status(200).send({ "filename": myfile.name });
        });
    }

});

router.get('/bastk/:key', function (req, res, next) {
    model.Report.findAll({
        where: { Id: req.params.key },
        include: [
            { model: model.ReportPhoto, where: { RowStatus: 1 } },
            { model: model.uv_sla },
            { model: model.ReportProgress, where: { ProgressStatus: 2 } },
            {
                model: model.Project, where: { RowStatus: 1 },
                include: [{
                    model: model.Pic, where: { RowStatus: 1, Username: { [Op.col]: 'Report.Pic' } },
                }]
            },
            { model: model.Location, where: { RowStatus: 1 } }
        ],
        order: [
            ['Id', 'DESC']
        ]
    }).then((result) => {
        result[0].CreateDateFormatted = result[0].CreateDate.toISOString().split('T')[0] + ' ' + result[0].CreateDate.toISOString().split('T')[1].substring(0, 8);
        result[0].FinishDateFormatted = result[0].FinishDate.toISOString().split('T')[0] + ' ' + result[0].FinishDate.toISOString().split('T')[1].substring(0, 8);
        res.render('bastv2', { obj: result[0], urlAttach: config.global_attachment });
    })

});
module.exports = router;