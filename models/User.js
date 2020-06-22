const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
    //NOTE/: Первый параметр обьект который содержит схему
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: String,
        fullname: {
            type: String,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        confirm_hash: String,
        last_seen: {
            type: Date,
            //NOTE/: Когда пользователь создается присваетвается дата
            default: new Date(),
        },
    },
    //NOTE/: Второй параметр это обьект, содержит конфигурацию схемы
    {
        //NOTE/: timestamps - true, Создавать два дополнительных поля :
        //NOTE/: created_at, updated_at
        timestamps: true,
    }
);

//NOTE/: создаем модель User и экспортируемы
module.exports = model("User", UserSchema);
