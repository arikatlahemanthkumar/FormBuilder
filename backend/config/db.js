import mongoose from "mongoose"


const configureDB = ()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Db is connected ")
    })
    .catch((err)=>{
        console.log("Db is not connected ",err)
    })
}

export default configureDB