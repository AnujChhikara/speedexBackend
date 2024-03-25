import express from "express"
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


//importing routes
import userRoutes from './routes/user.route.js'


//using routes or declaring

app.use("/api/v1/users", userRoutes)

export {app}