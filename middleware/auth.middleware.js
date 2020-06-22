const jwt = require("jsonwebtoken");
const config = require("config");

//NOTE/: Перехват параметров req, res, next -> продолжение
module.exports = (req, res, next) => {
    console.log("AUTHMIDDLEWARE : ", req.headers.authorization);

    //NOTE/: метод доступен в rest api, просто проверяет доступность сервера
    if (req.method === "OPTIONS") {
        //NOTE/: если это OPTIONS то возвращяем next
        return next();
    }

    //NOTE/: если это стандартный запрос POST/GET  выполняем в блоке try catch

    try {
        //NOTE/: получаем обект token из req.headers.authtorization
        //NOTE/: .authtorization это строка которую передаем с фронта
        //NOTE/: "Bearer TOKEN"
        const token = req.headers.authorization.split(" ")[1]; //

        //NOTE/: если токена в загаловке нет
        if (!token) {
            //NOTE/: Отправляем ответ 401 нет авторизации
            return res.status(401).json({
                message: "Нет авторизации",
            });
        }

        //NOTE/: если токен есть то раскодируем
        //NOTE/: verify() метод позволяет раскодировать токен
        //NOTE/: Вторым параметром указываем секретный ключь через config.get()

        const decoded = jwt.verify(token, config.get("jwtSecret"));

        //NOTE/: Получаем раскодированный токен, ложим его в обьект req
        //NOTE/: Создаем в обьекте req поле user и ложим туда раскодированный токен

        req.user = decoded;

        //NOTE/: Далее  выполняем метод next() для продолжения запроса

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Нет авторизации",
        });
    }
};
//NOTE/: в РЕЗУЛЬТАТЕ ДАННОГО MIDDLEWARE МЫ ПОЛУЧАЕМ id ДАННОГО ПОЛЬЬЗОВАТЕЛЯ В ПОЛЕ req.user.userId !!!
//NOTE/: Пример данного middleware в запросе

// const authMiddleware = require("../middleware/auth.middleware");

//NOTE/: перехват запроса для обработки токена authMiddleware!!!
// router.post("/generate", authMiddleware, async (req, res) => { ......

//NOTE/: !!!!! ЕСЛИ middleware ОТРАБАТЫВАЕТ УСПЕШНО ТО В ПОЛЕ  req.user.userId записывается id ползователя !!!

//NOTE/: Полный пример

//NOTE/: перехват запроса для обработки токена authMiddleware!!!
// router.get("/", authMiddleware, async (req, res) => {
//     try {
//         //NOTE/: обрашяемся к базе, ишем все ссылки которые относятся к текушему пользователю
//                     .//TODO: Текуший ID пользователя берется из middleware!!!!!//TODO:
//         const links = await Link.find({ owner: req.user.userId }); ///???

//         res.json(links);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Something went wrong, try again",
//         });
//     }
// });
