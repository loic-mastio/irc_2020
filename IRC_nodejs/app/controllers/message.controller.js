const Message = require("../models/message.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const message = new Message({
        sender: req.body.sender,
        content: req.body.content,
        id_channels: req.body.id_channels
    });

    Message.create(message, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the message."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Message.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving message."
            });
        else res.send(data);
    });
};

exports.findOneById = (req, res) => {
    Message.findById(req.params.messageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Message with id ${req.params.messageId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Message with id " + req.params.messageId
                });
            }
        } else res.send(data);
    });
};

exports.findByChannel = (req, res) => {
    Message.findByChannel(req.params.messageChannel, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MessageChannel with id ${req.params.messageChannel}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Message with id " + req.params.messageChannel
                });
            }
        } else res.send(data);
    });
};

exports.findBySender = (req, res) => {
    Message.findBySender(req.params.messageSender, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MessageSender with sender's name ${req.params.messageSender}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Message with sender's name " + req.params.messageSender
                });
            }
        } else res.send(data);
    });
};

exports.deleteAllByChannelId = (req, res) => {
    Message.remove(req.params.channelsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.channelsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete messages with id_channels " + req.params.channelsId
                });
            }
        } else res.send({ message: "Messages was deleted successfully from id_channel" + req.params.channelsId });
    });
};
