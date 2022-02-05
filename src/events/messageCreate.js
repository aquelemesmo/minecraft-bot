const config = require("../json/config.json")

module.exports = async (bot,message) => {
    if(message.author.bot || message.type.channel === "dm") return;

    let prefix = config.prefix;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    const arquivoCommand = bot.commands.get(cmd)

    try {
        arquivoCommand.run(bot, message, args)
    } catch (e) {
        console.log(e)
    }
}