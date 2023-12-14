const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcrypt");

require("./db/conn");
const Register = require("./models/register");

const port = process.env.POST || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", async (req, res) => {
  res.render("index.hbs");
});

app.get("/login", async (req, res) => {
  res.render("login.hbs");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.pass;

    const usersemail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, usersemail.password);

    if (isMatch) {
      res.status(201).render("index.hbs");
    } else {
      res.send("Error in login");
    }
  } catch (error) {
    res.status(400).send("Invalid email or password");
  }
});

app.get("/register", async (req, res) => {
  res.render("register.hbs");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.pass;
    const confirmpassword = req.body.cpass;

    if (password === confirmpassword) {
      const registerDetails = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password,
        confirmpassword,
        gender: req.body.gender,
        age: req.body.age,
      });

      const registered = await registerDetails.save();
      res.render("login.hbs", { message: "Registration successful" });
    } else {
      res.status(400).send({ message: "Passwords don't match" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// HASHING bcrypt.jh
// const securePassword = async (password) => {
//   const passhash = await bcrypt.hash(password, 10);
//   console.log(passhash);

//   const passcheck = await bcrypt.compare(password,passhash);
//   console.log(passcheck);
// };

// securePassword("Shashwat#2020");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
