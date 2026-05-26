const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


//mongoose middleware hook
//hash user password before saving the User to MongoDB - this method is mongoose pre-save middleware. It runs before saving a user to MongoDB.
userSchema.pre("save", async function() {
    console.log("pre-save hook will be called");
    if(this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        console.log("password ",this.password);
    }
    //Done hashing continue saving
    //next();
})

//Created User model from userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;

