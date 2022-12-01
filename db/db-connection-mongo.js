const mongoose = require ("mongoose");
const dotenv = require('dotenv').config();

const dbConnect = async () => {
    try {
        const url = 'mongodb+srv://user_api:p8G3MZdNd5RWX3L@cluster0.4l1xhhs.mongodb.net/Microservicio?retryWrites=true&w=majority'; 
       await mongoose.connect(url);
        console.log('CONEXION EXITOSA');
    } catch (error) {
        console.log('CONEXION FALLIDA', error);
    }
}    

module.exports = dbConnect;

