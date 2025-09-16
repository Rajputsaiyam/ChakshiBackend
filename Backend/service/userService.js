// const JWT = require('jsonwebtoken');
// const hash = require('../utils/hash');
// const AppError = require('../errors/index');
// const crypto = require('crypto');
// const User = require('../models/userModel');
// // const Admin = require('../models/admin.model');
// const JWT_SECRET_KEY='$a!yam@2024'

// //const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// console.log(JWT_SECRET_KEY);

// if (!JWT_SECRET_KEY || JWT_SECRET_KEY === '') {
//     throw new Error('Forget to set JWT_SECRET_KEY into your environment file');
// }

// class AuthService {
//     /**
//      * @function generateUserToken
//      * @param {{_id:string, role:'admin'|'user'}} payload 
//      * @returns {string} JWT Signed token
//     */
//     static generateUserToken(payload) {
//         console.log("Generating user token");
//         console.log(payload);
//         const token = JWT.sign(payload, JWT_SECRET_KEY);
//         console.log(token);
//         return token;
//     }

//     /**
//      * @function signupWithEmailAndPassword
//      * @param {{firstname:string, lastname?:string, email:string, password:string}} data 
//      * @returns {Promise<string>}
//     */
//     static async signupWithEmailAndPassword(data) {
//         const { Name,  Email, Password, Address, PinCode, ContactNo } = data;

//         const salt = crypto.randomBytes(16).toString('hex');

//         try {
//             const user = await User.create({
//                 Name,
//                 Email,
//                 Password: hash(Password, salt),
//                 Address,
//                 PinCode,
//                 ContactNo
//             });

//             const token = AuthService.generateUserToken({ id: user._id, Role: user.Role }) //Payload
//             return token;

//         } catch (err) {
//             if (err.code === 11000) return res.status(400).json({ error: err.message });
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }

//     /**
//      * @function signinWithEmailAndPassword
//      * @param {{email:string, password:string}} data 
//      * @returns {Promise<string>}
//     */
//     static async signinWithEmailAndPassword(data) {
//         const { Email, Password } = data;
//         console.log(data);
//         const userInDB = await User.findOne({ Email: Email });
//         console.log(userInDB);
//         if (!userInDB) throw new AppError(`User with email ${Email} does not exist`);

//         const hashPassword = hash(Password, userInDB.salt);
//         console.log("HELLO");
//         console.log(hashPassword);

//         if (hashPassword !== userInDB.Password) throw new AppError(`Invalid email id or password`);

//         const token = AuthService.generateUserToken({
//             _id: userInDB._id, role: userInDB.Role
//         });

//         return token;
//     }

//     static async decodeUserToken(token) {
//         try {
//             const payload = JWT.verify(token, JWT_SECRET_KEY);
//             return payload;
//         } catch (e) {
//             return false;
//         }
//     }
// }

// module.exports = AuthService;


const JWT = require('jsonwebtoken');
const hash = require('../utils/hash');
const AppError = require('../errors/index');
const crypto = require('crypto');
const User = require('../models/userModel');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is missing');
}

class AuthService {
  static generateUserToken(payload) {
    return JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
  }

  static async signupWithEmailAndPassword(data) {
    const { Name, Email, Password, Address, PinCode, ContactNo } = data;
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hash(Password, salt);

    try {
      const user = await User.create({
        Name,
        Email,
        Password: hashedPassword,
        salt,
        Address,
        PinCode,
        ContactNo
      });

      return AuthService.generateUserToken({ _id: user._id, role: user.Role });
    } catch (err) {
      if (err.code === 11000) {
        throw new AppError('Email already exists', 400);
      }
      throw new AppError('Internal Server Error', 500);
    }
  }

  static async signinWithEmailAndPassword(data) {
    const { Email, Password } = data;
    const userInDB = await User.findOne({ Email });
    if (!userInDB) throw new AppError(`User with email ${Email} does not exist`, 404);

    const hashPassword = hash(Password, userInDB.salt);
    if (hashPassword !== userInDB.Password) {
      throw new AppError('Invalid email or password', 401);
    }

    return AuthService.generateUserToken({ _id: userInDB._id, role: userInDB.Role });
  }

  static async decodeUserToken(token) {
    try {
      return JWT.verify(token, JWT_SECRET_KEY);
    } catch {
      return false;
    }
  }
}

module.exports = AuthService;
