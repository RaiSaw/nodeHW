import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { handleIndexId } from "../../../middlewares.mjs"
import { userSchema } from "../utils/validationSchema.mjs"
import { User } from "../mongoose/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { createUserHandler, authorize } from "../handlers/users.mjs";

const router = Router();
router
.get(
    "/users",
    query("filter")
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({ min: 5, max: 10})
        .withMessage("Must be at least 5-10 characters"),
    async (req, res) => {
        console.log(req.session.id);
        console.log(req.session)
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                console.log(err)
                throw err
            }
            console.log(`Inside Session Store Get: ${sessionData}`)
        })
	    try {
	    	const data = await User.find();
	    	res.json(data)
	    } catch (err) {
	    	res.status(500).json({message: err.message})
	    }
        /* const { query: { filter, value } } = req;
        if (filter && value) return res.send( users.filter((user) => user[filter].includes(value)))
        return res.send(users);
        */
})

.get("/users/:id", async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const data = await User.findById(id)
        console.log(data)
        res.json(data)
   }
   catch (error) {
       res.status(400).json({message: error.message})
   }
})

.post(
    "/users",
    checkSchema(userSchema),
    createUserHandler
)

/* .put("/users/:id", handleIndexId, (req, res) => {
}) */

.patch("/users/:id", async(req, res) => {
	/* const data = matchedData(req);
	data.password = hashPassword(data.password);
	const newUser = new User(data); */
    try{
        const id = req.params.id
        const upData = req.body
        console.log(upData)
        const options = { new: true }
        /* upData.password = hashPassword(upData.password); */
        const data = await User.findByIdAndUpdate( id, upData, options)
        res.send(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

.delete("/users/:id", async(req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndDelete(id)
        res.send(`${data.name} has been deleted!` )
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

export default router;