const express = require("express");
const DialogModel = require("../models/Dialog");
const MessageModel = require("../models/Message");

class DialogController {
    constructor(io) {
        this.io = io;
    }

    //Получить список диалогов автора по id
    index(req, res) {
        console.log(req.user.userId);
        //BUG:/ Временный id автора
        const authorId = req.user.userId;

        DialogModel.find({ author: authorId })
            //NOTE/: populate  "author" - получить автора диалога с данными
            //NOTE/: populate  "partner" - получить партнера диалога с данными
            .populate(["author", "partner"])
            .exec(function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: "dialog not found",
                    });
                }
                return res.json(dialogs);
            });
    }

    //NOTE/: создать диалог

    create(req, res) {
        const postData = {
            //NOTE/: получить id автора диалога из req.body.author
            author: req.body.author,
            //NOTE/: получить id партнера диалога из req.body.author
            partner: req.body.partner,
        };

        //NOTE/: Создаем новый диалог
        const dialog = new DialogModel(postData);

        //NOTE/: Сохраняем диалог в бд
        dialog
            .save()
            .then((dialogObj) => {
                //NOTE/: Сразу создаем новое сообщение в котором будут содержатся
                //NOTE/: текст, диалог которому он пренадлежит
                const message = new MessageModel({
                    //NOTE/: Текст сообшения
                    text: req.body.text,
                    //NOTE/: id диалога
                    dialog: dialogObj._id,
                    //NOTE/: автор диалога
                    user: req.body.author,
                });

                //NOTE/: сохраняем диалог

                message.save().then(() => {
                    res.json(dialogObj);
                });
            })
            .catch((reason) => {
                res.json(reason);
            });
    }
    delete(req, res) {
        const id = req.params.id;
        DialogModel.findByIdAndRemove({ _id: id })
            .then((dialog) => {
                if (dialog) {
                    res.json({
                        message: "Диалог удалён",
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: "Диалог не найден",
                });
            });
    }
}

module.exports = DialogController;
