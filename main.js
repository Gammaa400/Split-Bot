const config = require('./config.js')
const Commando = require('discord.js-commando')
const path = require('path')
require('dotenv').config()
const client = new Commando.CommandoClient({
  owner: ['163396331585536010', '271437356450578442'],
  commandPrefix: config.prefix,
})

client.on("guildMemberUpdate", function(oldMember, newMember){
  console.log(`OLD: ( ${oldMember.nickname}, ${oldMember.user.username} ) ---> NEW: ( ${newMember.nickname}, ${newMember.user.username} ) | Time: ${new Date}`)
});
client.on('ready', async () => {
  console.log('The client is ready!')

  client.registry
    .registerGroups([
      ['albion', 'albion commands'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))
})
client.login(config.token)
