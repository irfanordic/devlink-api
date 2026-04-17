import app from "./app.js";
import { prisma } from "./config/prisma.js";
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server is running on :" + PORT)
})