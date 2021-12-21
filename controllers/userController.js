var express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { User } = require('../models/User.js');

// authenticate jwt, if valid then response private claim data
exports.authenticateJWT = (req, res) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message: err.message});
            }
            res.send(user)
        });
    } else {
        res.sendStatus(401);
    }
}

// generate jwt if nik and password is exist
exports.generateJWT = async (req, res) => {
    try {
        const user = await User.findOne({ "nik": req.body.nik});
        if (user == null){
            return res.status(400).json({message: 'Cannot find user'})
        }
        try{
            if(req.body.password === user.password){
                const payload = { sub: req.body.nik, nik: req.body.nik, password: req.body.password}
                const accessToken =  jwt.sign(payload, process.env.JWT_KEY_SECRET, { expiresIn: '12h' })
                res.json({ id: user._id, nik: user.nik, role: user.role, jwt: accessToken})
            }else{
                res.status(400).json({message: 'Wrong Password!'});
            }
        }catch{
            res.status(500).json({message: error.message});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// create a user
exports.createUser = async (req, res) => {
    const user = new User({ "nik": req.body.nik, "role": req.body.role, "password": req.body.generate_password});
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 