const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const port = process.env.port || 5000

app.use("/api/blog-stats",require("./routes/blog-stats"))
app.use("/api/blog/search",require("./routes/blog-search"))
app.listen(port,()=>{
    console.log(`Server Listening at http://localhost:${port}`)
})