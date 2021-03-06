const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

module.exports = model("User", schema);
