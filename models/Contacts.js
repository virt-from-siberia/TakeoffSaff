const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String },
    secondName: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    phone: { type: String },
    important: { type: Boolean },
    color: { type: String },
    owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Contacts", schema);
