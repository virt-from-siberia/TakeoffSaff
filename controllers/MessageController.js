const express = require("express");
const MessageModel = require("../models/Message");

class MessageController {
    constructor(io) {
        io = this.io;
    }

    //Получить список сообщений по id диалога
    index(req, res) {
        //NOTE/: берем id диалога из req.params.id
        const dialogId = req.query.dialog;

        //NOTE/: Делаем запрос к бд, найти диалог с таким id
        MessageModel.find({ dialog: dialogId })
            .populate(["dialog"])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        message: "Сообщение не найдено",
                    });
                }
                return res.json(messages);
            });
    }
    //NOTE/: создать диалог
    //NOTE/: привязываем сообщение к конкретному диалогу челез id диалога dialog_id
    create(req, res) {
        // console.log("REQUEST USER : ", req.user.userId);

        const userId = req.user.userId;

        const postData = {
            //NOTE/: Текст диалога
            text: req.body.text,
            //NOTE/: id пользователя
            user: userId,
            //NOTE/: id диалога к которому принадлежит сообщение
            dialog: req.body.dialog_id,
        };

        const message = new MessageModel(postData);

        message
            .save()
            .then((obj) => {
                res.json(obj);
                // this.io.emit("NEW_MESSAGE", obj);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    delete(req, res) {
        const id = req.params.id;

        MessageModel.findOneAndRemove({ _id: id })
            .then((message) => {
                if (message) {
                    res.json({
                        message: "Сообщение удалено",
                    });
                } else {
                    res.json({
                        message: "Сообщение  не найдено",
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: "Что то пошло не так",
                });
            });
    }
}

module.exports = MessageController;
