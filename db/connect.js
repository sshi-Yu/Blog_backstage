const mongoose = require('mongoose')

// mongoose.connect('mongodb://Yu:Yu261384@110.40.213.108:27017/Blog_Yu?authSource=admin')
// mongoose.connect('mongodb://localhost:27017/Blog_Yu')
mongoose.connect('mongodb://10.15.213.36:27017/Blog_Yu')

const con = mongoose.connection

con.once('open', () => {
    console.log('数据库已连接');    
})

con.on('error', (error) => {
    console.log('数据库链接失败，出错了===>' + error);  
})