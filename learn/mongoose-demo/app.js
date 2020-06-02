const mongoose = require('mongoose')

mongoose.connect('mongodb://test:123456@47.105.212.161:15000/testdb', { useNewUrlParser: true,useUnifiedTopology: true })

const User = mongoose.model('user', { name: String, age: Number, email: String })

const imooc = new User({
    name: 'imooc-test',
    age: 30,
    email: 'jerrychane@jerrychane.com'
})

imooc.save().then(() => { console.log('save OK!') })