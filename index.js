const { Client, Collection } = require("discord.js");
const bot = new Client({intents: 32767})
const fs = require("fs")
const config = require("./src/json/config.json")
bot.commands = new Collection()

fs.readdirSync("./src/commands").forEach(dir => {
    fs.readdir(`./src/commands/${dir}`, (err, files) => {
        if(err) console.error(err)
        let arquivojs = files.filter(f => f.split(".").pop() === "js")
        arquivojs.forEach(f => {
            let props = require(`./src/commands/${dir}/${f}`)
            bot.commands.set(props.help.name, props)
        })
    })
})

fs.readdir("./src/events", (err, files) => {
    if(err) console.error(err)
    files.forEach(f => {
        let eventFile = f.split(".")[0]
        let props = require(`./src/events/${f}`)
        bot.on(eventFile, props.bind(null, bot))
    })
})

bot.login(config.token)