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
    model.PushNotif.findAll().then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus = 1;
    model.PushNotif.findAll({
        where: req.body
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    req.body.PushData = JSON.stringify(req.body.PushData[0]);
    model.PushNotif.create(req.body).then((result) => {
        res.json(result);
    })
});
router.post('/notif/to/', function (req, res, next) {
    // const webpush = require('web-push');
    // const vapidKeys = {
    //     "publicKey": "BKNBVSiQL0_ncDMju-7aVRrr9U98jhOzGsukMF097iPgajXf9CE9YshsHIycCQfRBtk_lpJ5w_vTlAsD1rRmYdE",
    //     "privateKey": "K6klxUTRbeKjKWxt_FZTSteQdx6Bfc5o7GGLPUCneeI"
    // }
    // webpush.setVapidDetails(
    //     'mailto:erwin.ant@gmail.com',
    //     vapidKeys.publicKey,
    //     vapidKeys.privateKey
    // );

    // model.PushNotif.findAll({
    //     where: {
    //         Username: {
    //             [Op.in]: req.body.Receiver
    //         }, RowStatus: 1
    //     }
    // }).then((result) => {
    //     //res.json(result.map(f => JSON.parse(f.PushData)));
    //     if (result.length > 0) {
    //         let USER_SUBSCRIPTIONS = [];
    //         USER_SUBSCRIPTIONS = result.map(f => JSON.parse(f.PushData));
    //         const notificationPayload = {
    //             "notification": {
    //                 "title": req.body.Title,
    //                 "body": req.body.Message,
    //                 "icon": config.icons + "icon-72x72.png",
    //                 "vibrate": [100, 50, 100],
    //                 "data": {
    //                     "dateOfArrival": Date.now(),
    //                     "primaryKey": 1,
    //                     "url": config.baseUrl
    //                 },
    //                 "actions": [{
    //                     "action": "open_url",
    //                     "title": "Check Now",
    //                     "icon": ""
    //                 }]
    //             }
    //         };
    //         Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
    //             sub, JSON.stringify(notificationPayload))))
    //             .then(() => res.status(200).json({ Message: "Push Sent!" }))
    //             .catch(err => {
    //                 console.log(err);
    //                 model.PushNotif.destroy({
    //                     where: {
    //                         Username: {
    //                             [Op.in]: req.body.Receiver
    //                         }, RowStatus: 1
    //                     }
    //                 }).then(() => { res.status(400).json({ Message: "Error while push to server" }) });
    //             });
    //     } else {
    //         res.status(200).json({ message: req.body.Message });
    //     }
    // });
    
    pushNotif(req, (result) => {
        if (result === "done") {
            res.status(200).json({ Message: "Push Sent!" });
        } else {
            res.status(400).json({ Message: "Error while push to server" });
        }
    })
});

pushNotif = (req, callback) => {
    const webpush = require('web-push');
    const vapidKeys = {
        "publicKey": "BKNBVSiQL0_ncDMju-7aVRrr9U98jhOzGsukMF097iPgajXf9CE9YshsHIycCQfRBtk_lpJ5w_vTlAsD1rRmYdE",
        "privateKey": "K6klxUTRbeKjKWxt_FZTSteQdx6Bfc5o7GGLPUCneeI"
    }
    webpush.setVapidDetails(
        'mailto:erwin.ant@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    model.PushNotif.findAll({
        where: {
            Username: {
                [Op.in]: req.body.Receiver
            }, RowStatus: 1
        }
    }).then((result) => {
        //res.json(result.map(f => JSON.parse(f.PushData)));
        if (result.length > 0) {
            let USER_SUBSCRIPTIONS = [];
            USER_SUBSCRIPTIONS = result.map(f => JSON.parse(f.PushData));
            const notificationPayload = {
                "notification": {
                    "title": req.body.Title,
                    "body": req.body.Message,
                    "icon": config.icons + "icon-72x72.png",
                    "vibrate": [100, 50, 100],
                    "data": {
                        "dateOfArrival": Date.now(),
                        "primaryKey": 1,
                        "url": config.baseUrl
                    },
                    "actions": [{
                        "action": "open_url",
                        "title": "Check Now",
                        "icon": ""
                    }]
                }
            };
            Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
                sub, JSON.stringify(notificationPayload))))
                .then(() => callback("done"))
                .catch(err => {
                    console.log(err);
                    model.PushNotif.destroy({
                        where: {
                            Username: {
                                [Op.in]: req.body.Receiver
                            }, RowStatus: 1
                        }
                    }).then(() => { callback("error"); });
                });
        } else {
            callback("done");
        }
    });
}
module.exports = router;