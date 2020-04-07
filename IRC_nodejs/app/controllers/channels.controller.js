const Channels = require("../models/channels.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const channels = new Channels({
        name: req.body.name,
        nbr_user_max: req.body.nbr_user_max,
        nbr_user: 1,
        owner_id: req.body.owner_id
    });

    Channels.create(channels, (err, data) => {
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
    Channels.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving channels."
            });
        else res.send(data);
    });
};

exports.findOneById = (req, res) => {
    Channels.findById(req.params.channelsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Channels with id ${req.params.messageId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Channels with id " + req.params.messageId
                });
            }
        } else res.send(data);
    });
};

exports.findByName = (req, res) => {
    Channels.findByName(req.params.channelsName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ChannelsSender with channels's name ${req.params.channelsName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Channels with channels's name " + req.params.channelsName
                });
            }
        } else res.send(data);
    });
};

exports.findByOwnerId = (req, res) => {
    Channels.findByOwner(req.params.channelsOwnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ChannelsSender with owner's name ${req.params.channelsOwnerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Channels with owner's name " + req.params.channelsOwnerId
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    console.log(req.params.channelsId);
    Channels.remove(req.params.channelsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found channels with id ${req.params.channelsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete channels with id " + req.params.channelsId
                });
            }
        } else res.send({ message: `Channels was deleted successfully!` });
    });
};
