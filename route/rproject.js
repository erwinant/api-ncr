const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.Project.findAll({
        include: [
            { model: model.Pic, where: { RowStatus: 1 }, required: false },
            { model: model.Location, where: { RowStatus: 1 }, required: false }
        ]
    }).then(result => {
        res.json(result);
    });
});
router.post('/cr/', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Project.findAll({
        where: req.body,
        include: [
            { model: model.Pic, where: { RowStatus: 1 }, required: false },
            { model: model.Users, where: { RowStatus: 1, Role:'user' }, required: false },
            { model: model.Users,as: "QsPr", where: { RowStatus: 1, Role:'qs-pr' }, required: false },
            { model: model.Location, where: { RowStatus: 1 }, required: false }
        ]
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Project.create(req.body).then((result) => {
        res.json(result);
    })
});

router.post('/post/upsert/', function (req, res, next) {
    model.Project.findOrCreate({ where: { Id: req.body.Id }, defaults: req.body }).then((result1) => {
        if (result1[1]) { // created
            saveLocation(req.body.Locations, result1[0].Id, (loc) => {
                if (loc === "done") {
                    savePic(req.body.Pics, result1[0].Id, (pic) => {
                        if (pic === "done") {
                            saveUser(req.body.Pics, result1[0].Id, (uspc) => {
                                if (uspc === "done") {
                                    saveUser(req.body.Users, result1[0].Id, (us) => {
                                        if (us === "done") {
                                            res.json(result1[0]);
                                        } else { res.json("error while user"); }
                                    });

                                    saveUser(req.body.QsPr, result1[0].Id, (us) => {
                                        if (us === "done") {
                                            //res.json(result1[0]);
                                        } else {  }
                                    });
                                } else { res.json("error while user"); }
                            });

                        } else { res.json("error while pic"); }

                    })
                } else { res.json("error while loc"); }
            })
        } else {
            model.Project.update(req.body, { where: { Id: req.body.Id } }).then((updated) => {
                if (updated) {
                    saveLocation(req.body.Locations, req.body.Id, (loc) => {
                        if (loc === "done") {
                            savePic(req.body.Pics, result1[0].Id, (pic) => {
                                if (pic === "done") {
                                    saveUserPic(req.body.Pics, result1[0].Id, (uspc) => { //insert pic in table user
                                        if (uspc === "done") {
                                            saveUser(req.body.Users, result1[0].Id, (us) => { //insert only user
                                                if (us === "done") {
                                                    res.json(result1[0]);
                                                } else { res.json("error while user"); }
                                            });
                                            saveUser(req.body.QsPr, result1[0].Id, (us) => { //insert only user
                                                if (us === "done") {
                                                    //res.json(result1[0]);
                                                } else {  }
                                            });
                                        } else { res.json("error while user"); }
                                    });
                                }
                                else { res.json("error while pic"); }
                            })
                        } else { res.json("error while loc"); }
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

saveLocation = (locations, projectId, callback) => {
    model.Location.update(
        { RowStatus: 0 },
        { where: { ProjectID: projectId } }
    ).then((rowsUpdated) => {
        let checksum = 0;
        locations.forEach(el => {
            el.ProjectID = projectId;
            if (el.Id > 0) {
                model.Location.update(el, { where: { Id: el.Id } }).then((updated) => {
                    checksum++;
                    if (checksum == locations.length) {
                        callback("done");
                    }
                })
            } else {
                model.Location.create(el).then((inserted) => {
                    checksum++
                    if (checksum == locations.length) {
                        callback("done");
                    }
                })
            }
        })
    })
}
savePic = (pics, projectId, callback) => {
    model.Pic.update(
        { ProjectID: null },
        { where: { ProjectID: projectId } }
    ).then((rowsUpdated) => {
        if (pics.length > 0) {
            let checksum = 0;
            pics.forEach(el => {
                el.ProjectID = projectId;
                if (el.Id > 0) {
                    model.Pic.update(el, { where: { Id: el.Id } }).then((updated) => {
                        checksum++;
                        if (checksum == pics.length) {
                            callback("done");
                        }
                    })
                } else {
                    model.Pic.create(el).then((inserted) => {
                        checksum++
                        if (checksum == pics.length) {
                            callback("done");
                        }
                    })
                }
            })
        } else {
            callback("done");
        }
    })
}

saveUser = (pics, projectId, callback) => {
    console.log(pics);
    if (pics.length > 0) {
        model.Users.update(
            { ProjectID: null },
            { where: { ProjectID: projectId, Role:'user' } }
        ).then((rowsUpdated) => {
            if (pics.length > 0) {
                let checksum = 0;
                pics.forEach(el => {
                    el.ProjectID = projectId;
                    if (el.Id > 0) {
                        model.Users.update(el, { where: { Username: el.Username } }).then((updated) => {
                            checksum++;
                            if (checksum == pics.length) {
                                callback("done");
                            }
                        })
                    } else {
                        model.Users.create(el).then((inserted) => {
                            checksum++
                            if (checksum == pics.length) {
                                callback("done");
                            }
                        })
                    }
                })
            } else {
                callback("done");
            }
        })
    } else {
        callback("done");
    }
}

saveUserPic = (pics, projectId, callback) => {
    if (pics.length > 0) {
        model.Users.update(
            { ProjectID: null },
            { where: { ProjectID: projectId, Role:'pic' } }
        ).then((rowsUpdated) => {
            if (pics.length > 0) {
                let checksum = 0;
                pics.forEach(el => {
                    el.ProjectID = projectId;
                    if (el.Id > 0) {
                        model.Users.update(el, { where: { Username: el.Username } }).then((updated) => {
                            checksum++;
                            if (checksum == pics.length) {
                                callback("done");
                            }
                        })
                    } else {
                        model.Users.create(el).then((inserted) => {
                            checksum++
                            if (checksum == pics.length) {
                                callback("done");
                            }
                        })
                    }
                })
            } else {
                callback("done");
            }
        })
    } else {
        callback("done");
    }
}
module.exports = router;