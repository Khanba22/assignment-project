const express = require("express")
const router = express.Router()
const lodash = require("lodash")
router.get("/",async(req,res)=>{
    const options = {
        method: 'GET',
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
      };
    await fetch("https://intent-kit-16.hasura.app/api/rest/blogs",options).then(response=>{
        return response.json()
    }).then(data=>{
        blogs = data.blogs
        var string = req.query.query
        if(!query){
            throw new Error("Query Not Found");
        }
        responseData = lodash.filter(blogs,blog=>{
            const flag =  lodash.includes(blog.title.toUpperCase(),`${string.toUpperCase()}`)
            return flag
        })
        res.json(responseData)
    }).catch(err=>{
        console.log(err)
        res.status(400)
        res.json(err.message)
    })
})

module.exports = router