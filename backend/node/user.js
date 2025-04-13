console.log("hello chirag")
var userName= "chirag"
var userAge =22

const printUserData =(a)=>{
    console.log ("print user data function")
}
//module.export=userName
//module.export=userAge

module.exports= {
    userName,userAge,printUserData
}