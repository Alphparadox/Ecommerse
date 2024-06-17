require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const uploadDir = process.env.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static(uploadDir));

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${BASE_URL}/images/${req.file.filename}`,
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
  const { name, email, password } = req.body;
  let check = await User.findOne({ email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with the same email id",
    });
  }

  const user = new User({ name, email, password, cartData: [] });
  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    const passcompare = password === user.password;

    if (passcompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong password" });
    }
  } else {
    res.json({ success: false, error: "Wrong user ID" });
  }
});

app.post("/addproduct", async (req, res) => {
  const { name, image, category, new_price, old_price } = req.body;
  let id = (await Product.countDocuments()) + 1;

  const product = new Product({
    id,
    name,
    image,
    category,
    new_price,
    old_price,
  });

  await product.save();

  res.json({ success: true, name });
});

app.post("/removeproduct", async (req, res) => {
  const { id } = req.body;
  await Product.findOneAndDelete({ id });
  res.json({ success: true });
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
    return res.status(401).send({ errors: "Invalid authorization" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid authorization" });
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
