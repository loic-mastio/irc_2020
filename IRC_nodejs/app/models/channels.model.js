const sql = require("./db.js");

const Channels = function(channels) {
    this.name = channels.name;
    this.nbr_user_max = channels.nbr_user_max;
    this.nbr_user = 1;
    this.owner_id = channels.owner_id;
};

Channels.create = (newChannels, result) => {
    sql.query("INSERT INTO channels SET ?", newChannels, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created channels: ", { id: res.insertId, ...newChannels });
        result(null, { id: res.insertId, ...newChannels });
    });
};

Channels.findById = (channelsId, result) => {
    sql.query(`SELECT * FROM channels WHERE id = ${channelsId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found channels: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Channels.findByName = (channelsName, result) => {
    sql.query(`SELECT * FROM channels WHERE name = '${channelsName}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found channels: ", res[0]);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Channels.findByOwner = (channelsOwnerId, result) => {
    sql.query(`SELECT * FROM channels WHERE owner_id = '${channelsOwnerId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found channels: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Channels.getAll = result => {
    sql.query("SELECT * FROM channels", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Channels: ", res);
        result(null, res);
    });
};

Channels.remove = (channelsId, result) => {
    sql.query("DELETE FROM channels_liked WHERE id_channels = ?", channelsId);
    sql.query("DELETE from messages where id_channels = ?", channelsId);
    sql.query("DELETE FROM channels WHERE id = ?", channelsId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        } else {
            console.log("deleted Channels with id: ", channelsId);
            result(null, res);
        }
    });
};


module.exports = Channels;
