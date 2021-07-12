const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const mongo = require('../../mongo')
const GuildList = require('../../GuildList')
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'split',
      group: 'albion',
      memberName: 'split',
      description: '',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    let client = this.client

    if(args[0] === 'addGuild')
    {
      addGuildToList()
    }else
    {
      RunCommand()
    }
    

    async function addGuildToList()
    {
      console.log('Working')
      let GuildNames = 'Test'
      const guildId = message.guild.id
      const test = await GuildList.addGuild(guildId, GuildNames)
      console.log(test)
    }
   
    async function RunCommand()
    {
      const GuildList = ['[OL]', '[Sumos]', '[MAYO]', '[MK]', '[MTD]', '[R]', '[MEGA]', '[CB]', '[GR]', '[Raven]', '[ROA]', '[ArL]', '[Feik]', '[TEQ]']
      const guild = client.guilds.cache.get(message.guild.id)
      let Channel 
      let Completed = []
      let missing = []
      let Tag
      for (let x = 0; x < args.length; x++) 
      {
        Channel = guild.channels.cache.find(channel => channel.name === `${args[x].split("+").join(" ")}`).members
        Channel.each(user => {
          
          if(user.nickname == undefined)
          {
            //Checks if Username has one of guild tags
            for (let i = 0; i < GuildList.length; i++) {
              Tag = user.displayName.toLowerCase().includes(`${GuildList[i].toLowerCase()}`)
              if(Tag === true)
              {
                Completed.push(user.displayName.toLowerCase())
                break
              }
            }
            if(Tag != true){missing.push(user.displayName)}
          }else
          {
            Completed.push(user.nickname.toLowerCase())
          }
        })
      }
      console.log('Missing Array', missing)

      //Current Guild attendance
      let GuildListNumbers = []
      var Total = 0
      for (let i = 0; i < GuildList.length; i++) {
        GuildListNumbers[i] = Completed.filter(Completed => Completed.includes(`${GuildList[i].toLowerCase()}`)).length
        Total = Total + GuildListNumbers[i]
      }
      //Text for Embed
      let MessedTag = Completed.length + missing.length
      let GuildNames = []
      let GuildNumbers = []
      for (let i = 0; i < GuildList.length; i++) {
        GuildNames[i] = `**${GuildList[i].slice(1, -1)}**\n`
        GuildNumbers[i] = `${GuildListNumbers[i]} - ${Math.round(GuildListNumbers[i]/Total*100)}%\n`
      }
    
      const finalEmbed = new Discord.MessageEmbed()
        .setTitle('Split')
        .addFields(
            { name: 'Guild', value: `${GuildNames.join(' ')}**Others**\n \n**Total**`, inline: true },
        { name: 'Amount', value: `${GuildNumbers.join(' ')}${MessedTag-Total}\n \n${Total}`, inline: true},)
        .setTimestamp()
        .setColor('GREEN')
    
      message.channel.send(finalEmbed);
    }
  }
}