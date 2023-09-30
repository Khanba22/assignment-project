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
        const blogs = data.blogs
        const longest = lodash.maxBy(blogs,"title.length")
        const privateBlogs = lodash.filter(blogs,(blog)=>{
            return lodash.includes(blog.title.toLowerCase(),"privacy")
        })
        const uniqueTitle = lodash.uniqBy(blogs,"title")
        const titles = lodash.map(uniqueTitle,blog=>blog.title)
        res.json({
            noOfBlogs:blogs.length,
            titleOfLongest:longest.title,
            blogsWithPrivacy:privateBlogs.length,
            titles:titles
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router