const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot,message,args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Você não tem permissão para executar este comando.")

    let perguntas = [
        "Qual será o título do anúncio?",
        "Informe o texto do anúncio",
        "Em qual canal será enviado o anúncio?",
        "Deseja mencionar? (sim/não)"
    ]

    let respostas = []

    message.channel.send(perguntas[0])

    const collect = message.channel.createMessageCollector({filter: ({author}) => author.id === message.author.id})

    collect.on('collect', (re) => {
        if(perguntas[respostas.length] === 'vai marcar everyone? (sim/não)' && !['sim', 'não'].some(x => re.content.toLowerCase().includes(x))) return message.channel.send('Resposta invalida!')
        respostas.push(re.content)
        if(perguntas.length === respostas.length || !perguntas[respostas.length]) return collect.stop()
        message.channel.send(perguntas[respostas.length])
    })

    collect.on("end", (e) => {
        const canal = bot.channels.cache.get(respostas[2].replace(/[<#>]/g, ''))
        if(!canal) return message.reply("Canal não encontrado!")
        const embed = new MessageEmbed()
        .setTitle(`${respostas[0]}`)
        .setDescription(`${respostas[1]}`)

        canal.send({embeds:[embed], content: (respostas[3].toLowerCase() === 'não' ? null:`@everyone`)})
    })
}

module.exports.help = {
    name: "anunciar"
}