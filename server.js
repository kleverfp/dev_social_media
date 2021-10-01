const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.json({msg:"Api running."})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server listen on port ${PORT}`)});