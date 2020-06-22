const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const updateLastSeen = require("../middleware/updateLastSeen");
const bodyParser = require("body-parser");

const DialogController = require("../controllers/DialogController");
const MessageController = require("../controllers/MessageController");
const UserController = require("../controllers/UserController");

const createRoutes = (app, io) => {
    const Dialog = new DialogController(io);
    const User = new UserController(io);
    const Message = new MessageController(io);

    app.use(bodyParser.json({ extended: true }));
    //NOTE/: middleware обновляет последнее посишение пользователя
    app.use(updateLastSeen);

    //NOTE/: Регистрация и логин
    app.use("/api/auth", require("./auth.routes"));

    //NOTE/: FAKE JSON DIALOGS
    app.use("/api", authMiddleware, require("./fake.routes"));
    //NOTE/: test request
    app.use("/api", authMiddleware, require("./test.routes"));

    //NOTE/:  Получить пользователя по id
    //NOTE/:  Получить информацию о себе
    //NOTE/: Удалить пользователя
    app.get("/user/me", authMiddleware, User.getMe);
    app.delete("/user/:id", authMiddleware, User.delete);

    //NOTE/: Получить все диалоги пользователя по id
    //NOTE/: Создать диалог, с параметрами author и partner
    app.get("/dialogs", authMiddleware, Dialog.index);
    app.post("/dialogs", authMiddleware, Dialog.create);
    app.delete("/dialogs/:id", authMiddleware, Dialog.delete);

    //NOTE/: Получить все сообшения  по id диалогу
    //NOTE/: создать диалог
    app.get("/messages", authMiddleware, Message.index);
    app.post("/messages", authMiddleware, Message.create);
    app.delete("/messages/:id", authMiddleware, Message.delete);
};

module.exports = createRoutes;
