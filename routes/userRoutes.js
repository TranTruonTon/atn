
const express = require("express");
const userModel = require("../models/user");


const router = express.Router();


/////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const user = await userModel.find({});

    try {
        res.render("user", { user : user , layout: 'main'});
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/create", async (req, res) => {
    res.render("user-register" );
});


router.get("/view/:id", async (req, res) => {
    res.send("View " + req.params.id);
});

/////////////////////////////////////////////////////////////////////////////////////////////
router.get("/edit", async (req, res) => {

    res.render("/edit-user", {post})
});




router.post("/", async (req, res) => {
    const user = new userModel(req.body);

    try {
        console.log(req.body);
        await  user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        console.log(req.params, req.body);
        const user = await  userModel.findByIdAndUpdate(req.params.id, req.body);
        await  userModel.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.delete("delete/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await  userModel.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).send("NO item !");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

//////////////////////////////////////////
module.exports = router;