const sql = require("./db.js");

const ChannelsFav = function(channelsFav) {
    this.id_channels = channelsFav.id_channels;
    this.id_user = channelsFav.id_user;
};

ChannelsFav.create = (newChannelsFav, result) => {
    sql.query("INSERT INTO channels_liked SET ?", newChannelsFav, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created channels Fav: ", { id: res.insertId, ...newChannelsFav });
        result(null, { id: res.insertId, ...newChannelsFav });
    });
};

ChannelsFav.findByIdchannels = (channelsId, result) => {
    sql.query(`SELECT * FROM channels_liked WHERE id_channels = ${channelsId}`, (err, res) => {
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

ChannelsFav.findByIdUsers = (usersId, result) => {
    sql.query(`SELECT * FROM channels_liked WHERE id_user = '${usersId}'`, (err, res) => {
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

ChannelsFav.getAll = result => {
    sql.query("SELECT * FROM channels_liked", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Channels: ", res);
        result(null, res);
    });
};

ChannelsFav.remove = (channelsId, userId, result) => {
    console.log("querry param:" + channelsId + " + " + userId);
    sql.query("DELETE FROM channels_liked WHERE id_channels = ? and id_user = ?", [channelsId, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        } else {
            console.log("deleted Channels fav with idChannels: " + channelsId + " id user: " + userId);
            result(null, res);
        }
    });
};


module.exports = ChannelsFav;
