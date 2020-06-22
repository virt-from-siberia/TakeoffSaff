const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

//NOTE/: Path /api/auth/
//NOTE/: Registration
router.post(
    "/register",
    //NOTE/: Массив middleware
    [
        //NOTE/: Метод check от express-validator, проверка email
        check("email", "Некорректный Email").isEmail(),
        check(
            "password",
            "Минимальная длина пароля минимум 6 символов"
        ).isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        try {
            //NOTE/: Передаем express-validator req для валидации, все ошибки будут сложины в const errors

            const errors = validationResult(req);
            //NOTE/: проверяем  если НЕ пустой
            if (!errors.isEmpty()) {
                //NOTE/: Возврашяем ошибки на фронт
                return res.status(400).json({
                    //NOTE/: Приводим к массиву errors и передаем в обькет errors
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации",
                });
            }

            const { email, password, fullname } = req.body;
            //NOTE/: Логика регистрации
            //NOTE/: Проверка есть ли такой полььзователь в базе
            //NOTE/: Ожидаем пока модель полььзователя будет найдена по Email
            const candidate = await User.findOne({ email: email });

            //NOTE/: Если пользователь с таким email уже найден
            if (candidate) {
                //NOTE/: return что бы дальше скрипт не шол
                return res.status(400).json({
                    message: "Такой пользователь уже существует",
                });
            }

            //NOTE/: Если пользователь с таким email НЕ найден то тогда регестрируем нового пользователя

            //NOTE/: хэширум пароль в bcrypt
            //NOTE/: Передаем в bcrypt password который мы получили от req.body
            const hashedPassword = await bcrypt.hash(password, 12);

            //NOTE/: Создаем нового пользователя
            //NOTE/: В email ложим email который пришол от req.body
            //NOTE/: В password ложим hashedPassword который был уже захеширован bcrypt
            const user = new User({
                email: email,
                password: hashedPassword,
                fullname: fullname,
            });
            //NOTE/: ждем пока пользователь сохранится
            await user.save();

            //NOTE/: после сохранения позьзователя в db ответ фронту
            res.status(201).json({
                message: "Пользователь создан",
            });
        } catch (err) {
            res.status(500).json({
                message: "Что то пошло не так, попробуйте снова",
            });
        }
    }
);

//NOTE/: Path /api/auth/
//NOTE/: Login
router.post(
    "/login",
    //NOTE/: Массив middleware
    [
        check("email", "Введите коррекнтый Email").isEmail(),
        check("password", "Введите парль").exists(),
    ],
    async (req, res) => {
        try {
            //NOTE/: Передаем express-validator req для валидации, все ошибки будут сложины в const errors

            const errors = validationResult(req);
            //NOTE/: проверяем  если НЕ пустой
            if (!errors.isEmpty()) {
                //NOTE/: Возврашяем ошибки на фронт
                return res.status(400).json({
                    //NOTE/: Приводим к массиву errors и передаем в обькет errors
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему",
                });
            }
            //NOTE/: Логика по созданию пользователя
            //NOTE/: Получаем поля email, password из req.body
            const { email, password } = req.body;

            //NOTE/: Ишем ОДНОГО(findOne) пользователя d в db
            //NOTE/: Ишем по email
            const user = await User.findOne({ email: email });

            //NOTE/: Если нет такого пользователя то
            if (!user) {
                return res.status(400).json({
                    message: "Поьзователь не найден",
                });
            }
            //NOTE/: Если ползовател найден то
            //NOTE/: Спавниваем через bcrypt.compare password которыйпришол от  фронта и
            //NOTE/: user.password который пришол с db
            isMatch = await bcrypt.compare(password, user.password);

            //NOTE/: Если пароли НЕ совподают
            if (!isMatch) {
                return res.status(400).json({
                    message: "Неверный пароль",
                });
            }

            //NOTE/: Ползователь найден далле
            //NOTE/: Создаем jwt token

            const token = jwt.sign(
                //NOTE/: Первый параметр обььект, где указываем данные, которые будут зашифрованы в данном jwt токене
                //NOTE/: Ложим в userId => user.id который берется от user.id из db
                { userId: user.id },
                //NOTE/: Второй параметр ложим секретное слово из config.get('jwtSecret)
                config.get("jwtSecret"),
                //NOTE/: Третий параметр через сколько jwt token закончит свое сушествование
                { expiresIn: "7d" }
            );
            //NOTE/: Итог ответ фронту
            //NOTE/: Отправляем token и userId
            res.json({
                token: token,
                userId: user.id,
            });
        } catch (err) {
            res.status(500).json({
                message: "Что то пошло не так, попробуйте снова",
            });
        }
    }
);

module.exports = router;
