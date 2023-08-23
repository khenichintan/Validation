const path = require('path');
const db = require('../config/mysql');
const fs = require("fs");
const model = require("../model/model");
const { validationResult } = require("express-validator");

module.exports.home = (req, res) => {
    try {
        db.query(`select * from register `, (err, data) => {
            if (err) {
                console.log('home page find err : ', err);
            } else {
                console.log(data);
            }
        })
        return res.render('home');
    } catch (error) {
        console.log(err, "home page err");
    }
};

module.exports.addrecord = (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            let err_msg = error.mapped();
            // console.log();
            res.render("home", { errors: err_msg });
        } else {
            let name = req.body.f_name + " " + req.body.l_name;
            if (req.body.password == req.body.co_password) {
                let image = '';
                if (req.file) {
                    image = model.updata + '/' + req.file.filename;
                }


                let sql = `insert into register (name,email,number,password,Gender,Hobby,image) values ("${name}","${req.body.email}","${req.body.number}","${req.body.password}","${req.body.Gender}","${req.body.Hobby}","${image}")`
                db.query(sql, (err, data) => {
                    if (err) {
                        console.log("register user err in insert : ", err);
                    } else {
                        return res.redirect('back');
                    }
                })
            }
        }
    } catch (error) {
        console.log(error, "data add error");
    }
};


module.exports.view = async(req, res) => {
    try {
        db.query(`select * from register`, (err, data) => {
            if (data) {
                return res.render('view', { rgdata: data })
            } else {
                console.log("view page", err);
            }
        });
    } catch (error) {
        console.log(error, "view data error");
    }
};

module.exports.readmore = async(req, res) => {
    try {
        db.query(`select * from register where id=${req.params.id}`, (err, data) => {
            if (data) {
                console.log(data[0]);
                return res.render('readmore', { rgdetails: data[0] })
            } else {
                console.log("readmore page", err);
            }
        });
    } catch (error) {
        console.log(error, "readmore data error");
    }
};

module.exports.deleteRecord = async(req, res) => {
    try {
        await validate.findByIdAndDelete(req.params.id);
        return res.redirect('/view')
    } catch (error) {
        console.log("delete error", error);
    }
}