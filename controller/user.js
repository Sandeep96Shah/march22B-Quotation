const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    // extract the data from req.body object
    const { name, email, password, confirmPassword } = req.body;

    // check whether password and confirm passowrd matches or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password doesn't match!",
        data: {},
      });
    }

    // check if the user already exist or not by using the email
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "user already exists!",
        data: {},
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // now we will create the usr and send the response
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      quotations: [],
    });
    return res.status(200).json({
      message: "Successfully created the User!",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to create the user!",
      data: {
        error: error,
      },
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    // extract the data from the req.body object
    const { email, password } = req.body;

    // check if the user is present by the email or not
    const user = await User.findOne({ email: email });

    // a) if user exist then compare with password
    if (!user) {
      return res.status(400).json({
        message: "Please signup to use our platform!",
        data: {},
      });
    }

    const isPasswordMatched = bcrypt.compare(password, user.password);

    // a.b) else send status code with 400
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Email/Password does not matched!",
        data: {},
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      "M07QtTL9qT",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Successfully signIn",
      data: {
        token: token,
      },
    });
    // a.a) if password matched then send some data with status code as 200
  } catch (error) {
    return res.status(500).json({
      message: "Eror while signin",
      data: {
        error: error,
      },
    });
  }
};

module.exports.userDetails = async (req, res) => {
  try {
    // get the user id from the req.param
    const { userId } = req.params;

    // get the user details from User model by userId
    // populate the quotations property
    // do nested populate to get the user name

    const user = await User.findById(userId, "name email quotations").populate([
      {
        path: "quotations",
        populate: {
          path: "user",
          select: "name",
        },
      },
    ]);
    return res.status(200).json({
      message: "Successfully fetched user details from db!",
      data: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching the data from db",
      data: {
        error: error,
      },
    });
  }
};


module.exports.successfullySignedIn = (req, res) => {
  try{
    console.log('req.user', req.user);
    return res.status(200).json({
      message: "successfully signin/signup",
      data: {},
    })
  }catch(error){
    return res.status(500).json({
      message: "error while signingIn/Up using google",
      data: {
        error: error,
      }
    })
  }
}

