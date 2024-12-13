const express = require("express");
const path = require("path");

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '../assets')));
    app.use(express.static(path.join(__dirname, '../build')));

    app.get("*", (req, res, next) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
};