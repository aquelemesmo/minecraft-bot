const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot,message,args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Você não tem permissão para executar este comando.")

    let perguntas = [
        "Informe o ID do usuario",
        "Essa ação foi demotado, adicionado ou promovido? (demotado/promovido/adicionado)",
        "Mencione o cargo ou coloque o ID do cargo",
        "Coloque a data de hoje."
    ]

    let respostas = []

    message.channel.send(perguntas[0])

    const collect = message.channel.createMessageCollector({filter: ({author}) => author.id === message.author.id})

    collect.on('collect', (re) => {
        respostas.push(re.content)
        if(perguntas.length === respostas.length || !perguntas[respostas.length]) return collect.stop()
        message.channel.send(perguntas[respostas.length])
    })

    collect.on("end", (e) => {
        const canal = bot.channels.cache.get("935145629573873674")

        if(respostas[1] === "demotado") {
            const embedDemotado = new MessageEmbed()
            .setColor("RED")
            .setTitle(`Changelog - ${respostas[3]}`)
            .setDescription(`> O usuário <@${respostas[0]}> foi demotado da equipe`)
            canal.send({embeds: [embedDemotado]})
        } else if(respostas[1] === "promovido") {
            const embedPromovido = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle(`Changelog - ${respostas[3]}`)
            .setDescription(`> O usuário <@${respostas[0]}> foi promovido da equipe`)
            canal.send({embeds: [embedPromovido]})
        } else if(respostas[1] === "adicionado") {
            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Changelog - ${respostas[3]}`)
            .setDescription(`> O usuário <@${respostas[0]}> entrou para equipe como ${respostas[2]}`)
            canal.send({embeds: [embed]})
        }
    })
}

module.exports.help = {
    name: "changelog"
}