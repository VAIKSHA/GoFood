const express = require("express")
const router = express.Router()

router.post('/foodData', (req, res)=>{
    try{
        // console.log(global.fooditems, global.foodcategories)  // for debuging check
        res.send([global.fooditems, global.foodcategories])
    }
    catch(err){
        console.error(err.message)
        res.send('Server error')
    }
})

module.exports = router;