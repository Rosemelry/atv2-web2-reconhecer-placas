require("dotenv").config();
const  mongoose  = require("mongoose");

const dbUser=process.env.DB_USER
const dbPassowod=process.env.DB_PASS

const url=`mongodb+srv://${dbUser}:${dbPassowod}@cluster1.x6gdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

try{
    function conexaoDb(){
        mongoose.connect(url)
        
        .then(()=>{
          console.log("banco conectado com sucesso")
        })
      
        .catch((err)=> console.log("erro! na conexão do banco de dados",err))
    }
      
}catch{
    console.log("erro: antes da conexão do banco de dados")
}

module.exports={
    conexaoDb
}