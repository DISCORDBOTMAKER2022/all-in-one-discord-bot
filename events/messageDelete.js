const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  if (message.author.bot) return;

  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author
  });

  try {
    if (!require('../database/modlogs.json')[message.guild.id]) return;
    let modLogsID = require('../database/modlogs.json')[message.guild.id].channel;

    const logsEmbed = new MessageEmbed()
      .setColor(0xdb0f1d)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Mensaje enviado por <@${message.author.id}> eliminado en <#${message.channel.id}> \n\`${message.content}\`**`)
      .setFooter(`Autor: ${message.author.id} | ID de mensaje: ${message.id}`)
      .setTimestamp()

    await message.guild.channels.cache.get(modLogsID).send(logsEmbed);

  } catch (error) {
    //console.log(error)
  }

}