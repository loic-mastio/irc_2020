module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const message = require("../controllers/message.controller.js");
    const channels = require("../controllers/channels.controller.js");
    const channelsFav = require("../controllers/channelsFav.controller");
    //Users
    app.post("/users/create", users.create);
    app.get("/users", users.findAll);
    app.get("/users/:userId", users.findOne);
    app.put("/users/:userId", users.update);
    app.delete("/users/delete/:userId", users.delete);
    app.get("/users/connection/:name/:password", users.connectionClient);
    //Messages
    app.get("/message", message.findAll);
    app.post("/message/write", message.create);
    app.get("/message/getbyId/:messageId", message.findOneById);
    app.get("/message/getbyChannel/:messageChannel", message.findByChannel);
    app.get("/message/getbySender/:messageSender", message.findBySender);
    app.delete("/message/delete/:channelsId", message.deleteAllByChannelId);
    //Channels
    app.get("/channels", channels.findAll);
    app.post("/channels/create", channels.create);
    app.get("/channels/getbyId/:channelsId", channels.findOneById);
    app.get("/channels/getbyName/:channelsName", channels.findByName);
    app.get("/channels/getbyOwnerId/:channelsOwnerId", channels.findByOwnerId);
    app.delete("/channels/delete/:channelsId", channels.delete);
    //ChannelsFav
    app.post("/channelsFav/create", channelsFav.create);
    app.get("/channelsFav", channelsFav.findAll);
    app.get("/channelsFav/liked/:usersId", channelsFav.findAllLikedByIdUser);
    app.delete("/channelsFav/delete/:channelsId/:userId", channelsFav.delete);
};
