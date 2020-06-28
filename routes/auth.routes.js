const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /registration
// Registration
router.post(
  "/registration",

  [
    check("email", "Некорректный Email").isEmail(),
    check("password", "Минимальная длина пароля минимум 8 символов").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //console.log("res");
    //console.log(req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      const { email, password, fullname, phone } = req.body;

      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res.status(400).json({
          message: "Такой пользователь уже существует",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        password: hashedPassword,
        fullname: fullname,
        phone: phone,
      });

      await user.save();

      res.status(201).json({
        message: "Пользователь создан",
      });
    } catch (err) {
      //console.log(err);
      res.status(500).json({
        message: "Что то пошло не так, попробуйте снова",
      });
    }
  }
);

//Path /api/auth/
// Login
router.post(
  "/login",

  [
    check("email", "Введите коррекнтый Email").isEmail(),
    check("password", "Введите парль").exists(),
  ],
  async (req, res) => {
    //console.log("-> request", req);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          message: "Поьзователь не найден",
        });
      }

      isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Неверный пароль",
        });
      }

      const token = jwt.sign(
        { userId: user.id },

        config.get("jwtSecret"),

        { expiresIn: "7d" }
      );

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
