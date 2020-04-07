const sql = require("./db.js");

const Message = function(message) {
    this.sender = message.sender;
    this.content = message.content;
    this.id_channels = message.id_channels;
};

Message.create = (newMessage, result) => {
    sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created message: ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage });
    });
};

Message.findById = (messageId, result) => {
    sql.query(`SELECT * FROM messages WHERE id = ${messageId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found message: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Message.findByChannel = (messageChannel, result) => {
    sql.query(`SELECT * FROM messages WHERE id_channels = ${messageChannel}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found message: ", res[0]);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Message.findBySender = (messageSender, result) => {
    sql.query(`SELECT * FROM messages WHERE sender = '${messageSender}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found message: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Message.getAll = result => {
    sql.query("SELECT * FROM messages", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

Message.remove = (channelsId, result) => {
    sql.query("DELETE FROM messages WHERE id_channels = ?", channelsId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        } else {
            console.log("deleted messages with id channels: ", channelsId);
            result(null, res);

        }
    });
};

module.exports = Message;
