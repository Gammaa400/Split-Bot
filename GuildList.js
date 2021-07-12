const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

module.exports.addGuild = async (guildId, GuildNames) => {
  return await mongo().then(async (mongoose) => {
    try {

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
        },
        {
          guildId,
          GuildNames,
        },
        {
          upsert: true,
          new: true,
        }
      )

      return result
    } finally {
      
    }
  })
}

// module.exports.removeGuild = async (name, guildId, userId, coins) => {
//     return await mongo().then(async (mongoose) => {
//       try {
  
//         const result = await profileSchema.findOneAndUpdate(
//           {
//             guildId,
//           },
//           {
//             guildId,

//           },
//           {
//             upsert: true,
//             new: true,
//           }
//         )
  
//         return result.coins
//       } finally {
        
//       }
//     })
//   }