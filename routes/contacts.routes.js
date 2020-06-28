const { Router } = require("express");
const Contacts = require("../models/Contacts");
const authMiddleware = require("../middleware/auth.middleware");
const router = Router();

const sendError = (res, err) => {
  //console.log("-> err", err);
  res.status(500).json({
    message: "Что то пошло не так, попробуйте снова",
  });
};

router.post("/add", authMiddleware, async (req, res) => {
  const { userId } = req.user;

  try {
    const {
      name,
      email,
      secondName,
      website,
      address,
      phone,
      important,
      color,
    } = req.body;

    const newContact = new Contacts({
      // requred fields from front
      name,
      secondName,
      // optional fields from front
      email: email || "",
      website: website || "",
      address: address || "",
      phone: phone || "",
      important: important || false,
      color: color || "",
      owner: userId,
    });

    await newContact.save();

    res.status(201).json({ newContact });
  } catch (err) {
    sendError(res, err);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contacts.find({
      owner: req.user.userId,
    });

    res.json(contacts);
  } catch (err) {
    sendError(res);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);

    res.json(contact);
  } catch (err) {
    sendError(res);
  }
});

router.post("/edit", authMiddleware, async (req, res) => {
  //console.log(req.body);

  try {
    const contact = await Contacts.findOneAndUpdate(req.body.id, req.body, {
      upsert: false,
    });

    res.json(contact);
  } catch (err) {
    //console.log(err);
    sendError(res);
  }
});

router.delete("/edit/:id", authMiddleware, async (req, res) => {
  //console.log(req.params.id);

  try {
    const contact = await Contacts.findByIdAndRemove(req.params.id);

    res.json(contact);
  } catch (err) {
    //console.log(err);
    sendError(res);
  }
});

module.exports = router;
