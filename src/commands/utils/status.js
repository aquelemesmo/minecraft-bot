const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports.run = async (bot, message, args) => {
    let ip = "hypixel.net"

    request(`https://api.mcsrvstat.us/2/${ip}`, function (error, response, body) {
        if(!body) return message.reply("Erro detectado. Tente novamente mais tarde.")
        let server = JSON.parse(body)
        
        if(server.online === false) {
            const embed = new MessageEmbed()
            .setTitle("Informações do servidor " + ip)
            .addFields([
                {name: "> Status do servidor:", value: "Offline", inline: true},
                {name: "> Jogadores:", value: `${server.players.online}/${server.players.max}`, inline: true},
                {name: "> Versão do servidor:", value: `${server.version}`},
            ])
            message.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setTitle("Informações do servidor " + ip)
            .addFields([
                {name: "Status do servidor:", value: "Online"},
                {name: "Jogadores:", value: `${server.players.online}/${server.players.max}`},
                {name: "Versão do servidor:", value: `${server.version}`},
            ])
            message.reply({embeds: [embed]})
        }
    })
}

module.exports.help = {
    name: "status"
}