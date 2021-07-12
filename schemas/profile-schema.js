const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const reqArray = {
  type: Array,
  required: true,
}

const guildSchema = mongoose.Schema({
  guildId: reqString,
  guildList: reqString,

})

module.exports = mongoose.model('GuildListTest', guildSchema)