const {
    userSignupValidationSchema,
    userSigninValidationSchema
} = require('../lib/validators/user.validators');
const AuthService = require('../service/userService');
const AuthError = require('../errors/index');
const JWT = require('jsonwebtoken');

async function handleSignUp(req, res) {
    const body=req.body;
    console.log(body);
    const validationResult = await userSignupValidationSchema.safeParseAsync(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const { Name, Email, Password, Address, PinCode, ContactNo } = validationResult.data;

    try {
        const token = await AuthService.signupWithEmailAndPassword({
            Name,
            Email,
            Password,
            Address,
            PinCode,
            ContactNo,
            
        });
        return res.status(201).json({ status: 'success', data: { token } });
    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.code).json({ status: 'error', message: err.message });
        }
        return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
}

async function handleSignIn(req, res) {
    console.log("sign-in")
    console.log(req.body);
    const validationResult = await userSigninValidationSchema.safeParseAsync(req.body);
    console.log(validationResult.data);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const { Email, Password } = validationResult.data;
    try {
        const token = await AuthService.signinWithEmailAndPassword({ Email, Password });
        console.log("token in handle sign in ");
        console.log(token);
        return res.status(201).json({
            status: 'success',
            message: `success in sign in for ${Email}`,
            token 
        });

    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.code).json({ status: 'error', message: err.message });
        }
        return res.status(500).json({ status: 'error', error:err.message });
    }

}

async function handleMe(req, res) {
    if (!req.user) return res.json({ isLoggedIn: false });

    return res.json({ isLoggedIn: true, data: { user: req.user } });

}


module.exports = { handleSignUp, handleSignIn, handleMe };

