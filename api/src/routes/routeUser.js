const { Router } = require("express");
const { User, Request } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { generateToken } = require("../util/generateToken.js");
// const nodemailer = require("nodemailer");


const nodemailer = require("nodemailer");
const URI = "http://localhost:3001/user";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_PHONEZONE,
    pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
  },
});
// const transporter = nodemailer.createTransport({
//   host: "smtp.live.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_PHONEZONE,
//     pass: process.env.EMAIL_PHONEZONE_AUTHENTICATION,
//   },
//   tls: {
//     ciphers: "SSLv3",
//     rejectUnauthorized: false,
//   },
//   connectionTimeout: 5000
// });

router.get("/", async (req, res) => {
    const { email, name } = req.query;
  
    try {
      const users = await User.findAll({
        include: {
          model: Request
        },
      });
      if (name) {
        let result = users.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        result.length
          ? res.status(200).send(result)
          : res.status(404).send("name not found");
      } else if (email) {
        const users = await User.findAll({
          include: {
            model: Request
          },
          where: {
            email: {
              [Op.like]: `${email}%`,
            },
          },
        });
        users.length > 0
          ? res.status(200).send(users)
          : res.status(400).send(`User ${email} not found`);
      } else {
        const users = await User.findAll({
          include: {
            model: Request
          },
        }
         
        );
        res.status(200).send(users);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const { name, password, email } = req.body;
  
      const validate = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (validate) {
        return res
          .status(400)
          .send({ message: "User or Email already registered" });
      }
  
    
      const newUser = await User.create({
       
        name,
        password: bcrypt.hashSync(password, 8),
        email
      });

  
      if (!newUser) {
        return res.status(500).json({ error: "Failed to create user" });
      }
  
      const token = jwt.sign({ email }, "secret");
  
      return res.status(200).send({ message: "User registered", token });
    } catch (error) {
      console.log("error es: ", error);
      res.status(400).json({ error: error.message });
    }
  });

// post login

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({
      where: { email: email },
    });
  
    if(!user){
      return res.status(401).send({ message: 'Email or Password is invalid'})
    }
  
  
    if (!user || !user.password)
      return res.status(401).send({ message: "Email or Password is invalid" });
  
    if (bcrypt.compareSync(password, user.password)) {
      
  
      return res.status(200).json({
        message: "You have been successfully validated",
        data: {
          ...user,
          token: generateToken(user),
        },
      });
    } else return res.status(401).send({ message: "Email or Password is invalid" });
  });
  



  router.post("/passwordCode", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res
          .status(404)
          .json({
            message: "No se encontró ningún usuario con ese correo electrónico.",
          });
      }
  
      const confirmationCode = Math.floor(100000 + Math.random() * 900000);
      user.resetPasswordCode = confirmationCode;
      await user.save();
      const mailOptions = {
        from: "gleismerco13@hotmail.com",
        to: user.email,
        subject: "Cambio de contraseña",
        text: `Su código de confirmación es: ${confirmationCode}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: "A confirmation code has been sent to your email." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar su solicitud." });
    }
  });
  
  router.post("/resetPassword", async (req, res) => {
    const { email, code, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: email } });
  
      if (!user) {
        return res
          .status(404)
          .json({ message: "Not user found with that email." });
      }
  
      // Verificar que el código proporcionado por el usuario coincide con el código enviado por correo electrónico
      if (code !== user.resetPasswordCode) {
        return res
          .status(400)
          .json({ message: "The confirmation code is invalid." });
      }
  
      user.password = bcrypt.hashSync(password, 8);
      await user.save();
  
      // Generar y enviar token de autenticación al cliente
  
      res.json({ message: "Your password has been successfully changed." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar su solicitud." });
    }
  });

  router.post("/request", async (req, res) => {
    const { email, name, message } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: email, name: name } });
  
      if (!user) {
        return res.status(404).json({ message: "Not user found with that email." });
      }
      else {
        const solicitud = await Request.create({ message });
        await solicitud.setUser(user);
        
        // Configuración del servicio de correo
       
        
        // Contenido del correo
        // let mailOptions = {
        //   from: "gleismerco13@hotmail.com",
        //   to: email, // Correo del usuario que envía la solicitud
        //   subject: "Nueva solicitud",
        //   text: `Has recibido una nueva solicitud con el siguiente mensaje: ${solicitud.message}`,
        // };
        // const mailOptions = {
        //   from: user.email,
        //   to: process.env.EMAIL_PHONEZONE,
        //   subject: 'New message from contact form',
        //   html: `
        //     <p>Full name: ${user.name}</p>
        //     <p>Email: ${user.email}</p>
        //     <p>Message: ${user.message}</p>
        //   `,
        // };
        // Enviar el correo electrónico
        // transporter.sendMail(mailOptions, (error, info) => {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });
  
        res.status(200).json({ message: "Solicitud guardada" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ocurrió un error al procesar su solicitud." });
    }
  });

  // router.post("/request", async (req, res) => {
  //   const { email, name, message } = req.body;
  
  //   try {
  //     const user = await User.findOne({ where: { email: email, name: name } });
  
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: "Not user found with that email." });
  //     }
  //     else{
  //       const solicitud= await Request.create({
  //           message
  //       })

  //       await solicitud.setUser(user)
  //       res.status(200).json({ message: "solicitud guardada"})
  //     }
     
  
      
  //   } catch (err) {
  //     console.error(err);
  //     res
  //       .status(500)
  //       .json({ message: "Ocurrió un error al procesar su solicitud." });
  //   }
  // });


  router.put("/banned/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findOne({
        where: { id: id },
      });
      if (user.enabled === true) {
        await User.update({ enabled: false }, { where: { id: id } });
        res.send("User has been banned");
      } else {
        await User.update({ enabled: true }, { where: { id: id } });
        res.send("User has been unbanned");
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  // cambio a administrador
  
  router.put("/admin/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findOne({
        where: { id: id },
      });
  
      if (users.rol === "user") {
        await User.update({ rol: "admin" }, { where: { id: id } });
        res.send("updated user to admin");
      } else {
        await User.update({ rol: "user" }, { where: { id: id } });
        res.send("you have become a user");
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const selectedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (selectedUser) {
      res.status(200).send(selectedUser);
    } else {
      res.sendStatus(404);
    }
  });


  router.put("/admin/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findOne({
        where: { id: id },
      });
  
      if (users.rol === "user") {
        await User.update({ rol: "admin" }, { where: { id: id } });
        res.send("updated user to admin");
      } else {
        await User.update({ rol: "user" }, { where: { id: id } });
        res.send("you have become a user");
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const selectedUser = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (selectedUser) {
        let data = { ...req.body };
  
        let keys = Object.keys(data);
  
        keys.forEach((k) => {
          selectedUser[k] = data[k];
        });
  
        await selectedUser.save();
  
        res.status(200).send(selectedUser);
      } else {
        res.status(404);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (deletedUser) {
        await User.destroy({ where: { id: id } });
        return res.status(200).json("User deleted");
      } else {
        res.status(404).json({ msj: "user not found" });
      }
    } catch (err) {
      return res.status(500).send(`User could not be deleted (${err})`);
    }
  });
  
  module.exports = router;
  