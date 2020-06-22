const { Schema, model, Types } = require("mongoose");

const DialogSchema = new Schema(
    //NOTE/: Первый параметр обьект который содержит схему
    {
        //NOTE/: Партнер диалога тип - id пользователя
        //NOTE/: принемает id пользователя и привязывается через него к определенному user в бд по id
        partner: { type: Schema.Types.ObjectId, ref: "User" },
        //NOTE/: Автор диалога тип - id пользователя
        //NOTE/: принемает id пользователя и привязывается через него к определенному user в бд по id
        author: { type: Schema.Types.ObjectId, ref: "User" },
        //NOTE/: Последнее сообщение в диалоге
        //NOTE/: принемает id сообшения  и привязывается через него к определенному message в бд по id
        lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    //NOTE/: Второй параметр это обьект, содержит конфигурацию схемы
    {
        //NOTE/: timestamps - true, Создавать два дополнительных поля :
        //NOTE/: created_at, updated_at
        timestamps: true,
    }
);

//NOTE/: создаем модель User и экспортируемы
module.exports = model("Dialog", DialogSchema);
