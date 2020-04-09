const sql = require("./db.js");

const Users = function(users) {
    this.name = users.name;
    this.email = users.email;
    this.password = users.password;
    this.photo_url = users.photo_url;
    this.is_disabled = false;
};

Users.create = (newUsers, result) => {
    sql.query("INSERT INTO user SET ?", newUsers, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newUsers });
        result(null, { id: res.insertId, ...newUsers });
    });
};

Users.connection = (name, password, result) => {
    sql.query("Select * from user where name = ? and password = ?", name, password, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("connection user: ", res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Users.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Users.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

Users.updateById = (id, users, result) => {
    sql.query(
        "UPDATE user SET email = ?, name = ?, password = ?, is_disabled = ? WHERE id = ?",
        [users.email, users.name, users.password, users.is_disabled, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated user: ", { id: id, ...users });
            result(null, { id: id, ...users });
        }
    );
};

Users.remove = (id, result) => {
    sql.query("DELETE FROM channels_liked where id_user = ?", id);
    sql.query("UPDATE channels SET owner_id = 1 where owner_id = ?", id);
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        } else {
            console.log("deleted user with id: ", id);
            result(null, res);

        }
    });
};

module.exports = Users;
