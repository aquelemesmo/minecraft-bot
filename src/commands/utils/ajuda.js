const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js")

module.exports.run = async (bot,message,args) => {
    const row = new MessageActionRow()
    .addComponents(new MessageButton().setStyle("SUCCESS").setCustomId("home_id").setLabel("Página Inicial").setEmoji("⬅"))
    .addComponents(new MessageButton().setStyle("SUCCESS").setCustomId("utils_id").setLabel("Utilidades").setEmoji("🍃"))
    .addComponents(new MessageButton().setStyle("SUCCESS").setCustomId("admin_id").setLabel("Moderação").setEmoji("👮‍♂️"))

    const embed = new MessageEmbed()
    .setTitle("Painel de controle")
    .setThumbnail(message.guild.iconURL())
    .setDescription("Selecione uma das opções abaixo")
    .addFields([
        {name: "> 🍃 Utilidades", value: "Comandos de utilidades do bot."},
        {name: "> 👮‍♂️ Moderação", value: "Comandos de moderação do bot."},
    ])
    message.reply({embeds: [embed], components: [row]})

    const filtro = m => m.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector(filtro)

    collector.on("collect", async  r => {
        if(r.customId === "utils_id") {
            const utilsEmbed = new MessageEmbed()
            .setTitle("Categoria utilidades")
            .setThumbnail(message.guild.iconURL())
            .setDescription("\`\`\`\ ajuda | status \`\`\`")
            await r.deferUpdate()
            await r.editReply({embeds: [utilsEmbed]})
        } else if (r.customId === "admin_id") {
            const adminEmbed = new MessageEmbed()
            .setTitle("Categoria moderação")
            .setThumbnail(message.guild.iconURL())
            .setDescription("\`\`\`\ changelog | status \`\`\`")
            await r.deferUpdate()
            await r.editReply({embeds: [adminEmbed]})
        }
    })
}

module.exports.help = {
    name: "ajuda"
}