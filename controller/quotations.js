const Quotation = require("../model/Quotation");
const User = require("../model/user");

module.exports.createQuotation = async (req, res) => {
  try {

    // 1-> fetch data(content, userId) from the req.body object
    const { content, userId } = req.body;

    // 2-> create the quotation in Quotation model
    const quotation = await Quotation.create({
      content: content,
      user: userId,
    });

    // 3-> fetch the user by his/her id from User model
    const user = await User.findById(userId);

    // 4-> push the created quotation id in user quotations property
    user.quotations.push(quotation._id);

    // 5-> save the user data.
    await user.save();

    // 6-> send response with status code as 200
    return res.status(200).json({
      message: "Quotation created successfully!",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating the quotation",
      data: {
        error: error,
      },
    });
  }
};

module.exports.getAllQuotations = async (req, res) => {
  try {
    // get all the data from the Quotation model
    // populate the user ObjectId and select only the required field(name).
    const quotations = await Quotation.find({}).populate({
      path: "user",
      select: "name",
    });
    console.log("quotations", quotations);
    return res.status(200).json({
      message: "Quotations fetched successfully from the db!",
      data: {
        quotations: quotations,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while fetching the data from db!",
      data: {
        error: error,
      },
    });
  }
};
