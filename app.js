const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
app.use(bodyParser.json());
require('dotenv').config()
const PORT=process.env.PORT||4000;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
const server=http.createServer(app)
const io=new Server(server)
io.on('connection',(socket)=>{
    console.log("Connected ",socket.id)
    socket.on('message',(data)=>{
        console.log("Data")
        console.log(data)
    })
})
server.listen(PORT,()=>{
    console.log(`Server Started At PORT ${PORT}`)

})