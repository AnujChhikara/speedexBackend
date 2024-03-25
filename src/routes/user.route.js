import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/home").get((req,res) => {
    res.send("<h1>Hello</h1>")
})

export default router