  
const mongoose = require('mongoose')

const mongoPath =
  'mongodb+srv://OL:qOnouQUqK2SFmgBq@mongodb-albion.l7vuv.mongodb.net/MongoDB-Albion?retryWrites=true&w=majority&connectTimeoutMS=10000'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  return mongoose
}