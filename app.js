const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

const PORT = config.get("post") || 5000;

//   app.use(bodyParser.json({ extended: true }));
//   //NOTE/: middleware обновляет последнее посишение пользователя
//   app.use(updateLastSeen);

//   //NOTE/: FAKE JSON DIALOGS
//   app.use("/api", authMiddleware, require("./fake.routes"));
//   //NOTE/: test request
//   app.use("/api", authMiddleware, require("./test.routes"));

//   //NOTE/: Регистрация и логин
//   app.use("/api/auth", require("./auth.routes"));

//   //NOTE/:  Получить пользователя по id
//   //NOTE/:  Получить информацию о себе
//   //NOTE/: Удалить пользователя
//   app.use("/user", authMiddleware, require("./user.routes"));

//   //NOTE/: Получить все диалоги пользователя по id
//   //NOTE/: Создать диалог, с параметрами author и partner
//   app.use("/dialogs", authMiddleware, require("./dialogs.routes"));

//   //NOTE/: Получить все сообшения  по id диалогу
//   //NOTE/: создать диалог
//   app.use("/messages", authMiddleware, require("./messages.routes"));

async function start() {
    try {
        await mongoose.connect(config.get("mongoURL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        app.listen(5000, () => {
            console.log(`:::APP HAS BEEN STARTED::: on POST :  ${PORT}`);
        });
    } catch (err) {
        console.log("SERVER ERROR", err.message);
        process.exit(1);
    }
}

start();
