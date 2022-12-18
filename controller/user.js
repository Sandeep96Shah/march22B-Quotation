const User = require('../model/user');

module.exports.signUp = async (req, res) => {
    try{
        console.log('req.body', req.body)
        // extract the data from req.body object
        const { name, email, password, confirmPassword } = req.body;

        // check whether password and confirm passowrd matches or not
        if(password !== confirmPassword){
            return res.status(400).json({
                message: "password and confirm password doesn't match!",
            })
        }

        // check if the user already exist or not by using the email
        const user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({
                message: 'user already exists!',
            })
        }

        // now we will create the usr and send the response
        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
            quotations: []
        })
        return res.status(200).json({
            message: 'Successfully created the User!',
            data: {
                user: newUser
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "failed to create the user!",
            data: {
                error: error,
            }
        })
    }
}