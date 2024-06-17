

const PORT=4000;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static(uploadDir));

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  cartData: [
    {
      id: Number,
      size: String,
      quantity: Number,
    },
  ],
});

app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with the same email id",
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: [],
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    const passcompare = req.body.password === user.password;

    if (passcompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "wrong password" });
    }
  } else {
    res.json({ success: false, error: "wrong user id" });
  }
});

app.post("/addproduct", async (req, res) => {
  let id = (await Product.countDocuments()) + 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();

  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.get("/", (req, res) => {
  res.send("Express App is running");
});

app.get("/newcollection", async (req, res) => {
  let product = await Product.find({});
  let newcollection = product.slice(1).slice(-8);
  res.send(newcollection);
});

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ errors: "invalid authorization" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "invalid authorization" });
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  const { itemId, size } = req.body;

  const existingItem = userData.cartData.find(
    (item) => item.id === itemId && item.size === size
  );
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    userData.cartData.push({ id: itemId, size, quantity: 1 });
  }
  await userData.save();

  res.json({ success: true });
});

app.post("/remove", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  const { itemId, size } = req.body;

  const existingItem = userData.cartData.find(
    (item) => item.id === itemId && item.size === size
  );
  if (existingItem) {
    existingItem.quantity -= 1;
    if (existingItem.quantity <= 0) {
      userData.cartData = userData.cartData.filter(
        (item) => !(item.id === itemId && item.size === size)
      );
    }
    await userData.save();
  }

  res.json({ success: true });
});

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server running on PORT " + PORT);
  } else {
    console.log("Error: " + error);
  }
});
