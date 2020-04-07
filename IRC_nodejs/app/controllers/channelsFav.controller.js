const ChannelsFav = require("../models/channelsFav.models");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const channelsFav = new ChannelsFav({
        id_channels: req.body.id_channels,
        id_user: req.body.id_user,
    });

    ChannelsFav.create(channelsFav, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the channels."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    console.log("findall");
    ChannelsFav.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving channels."
            });
        else res.send(data);
    });
};


exports.findByIdchannelsFav = (req, res) => {
    ChannelsFav.findByIdchannels(req.params.channelsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found channels fav with id ${req.params.channelsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ChannelsFav with id " + req.params.channelsId
                });
            }
        } else res.send(data);
    });
};

exports.findAllLikedByIdUser = (req, res) => {
    ChannelsFav.findByIdUsers(req.params.usersId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found any fav with owner's id ${req.params.usersId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ChannelsFav with user id " + req.params.usersId
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    ChannelsFav.remove(req.params.channelsId, req.params.userId, (err, data) => {
        if (err) {
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found channelsFav with id ${req.params.channelsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete channelsFav with id " + req.params.channelsId
                });
            }
        } else res.send({ message: `ChannelsFav was deleted successfully!` });
    });
};
