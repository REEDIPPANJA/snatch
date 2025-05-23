const express = require('express');
const ownerRoute = express.Router();

const owner = require("../models/model.owner");
ownerRoute.get('/', (req, res) => {
    res.send("hey its working");
})
if (process.env.NODE_ENV === 'development') {
    console.log("hey its working inside development phase")
    ownerRoute.post("/create", async function (req, res) {
        let ownerList = await owner.find({});
        if (ownerList.length > 0) return res.status(502).send({ "message": "owner exists" })

        try {
            let { fullName, email, password } = req.body;
            let createdOwner = await owner.create({
                fullName,
                email,
                password
            })
            res.status(201).send(createdOwner);

        } catch (err) {
            console.log("error in user creation :", err.message);
        }
    })

}
ownerRoute.get('/admin', (req, res) => {
    let success=req.flash("success");
    res.render("createproducts",{success});
})

module.exports = ownerRoute;