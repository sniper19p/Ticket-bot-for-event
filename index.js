const fs = require("fs");
const Settings = global.Settings = require("./Settings/Settings.json");
const Discord = require("discord.js");
const bot = global.client;
const {Token } = require("./Settings/Settings.json");
const PREFIX = "p!"
const clients = new Discord.Client();



console.log("Launching bot...");
let _client = new Discord.Client();
if (Settings.Private_Server === true) {
    _client = new Discord.Client({
        fetchAllMembers: true
    });
}
const client = global.client = _client;

const Commands = global.Commands = new Map();
console.log("--------------------------------");
console.log("Loading commands...");
fs.readdirSync("./Commands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Commands/${file}`);
    if (prop.conf.commands == undefined || prop.run == undefined) return console.error(`[COMMAND] ${file} is not load.`);
    if (prop.conf.commands && prop.conf.commands.length > 0) {
        prop.conf.commands.forEach(aliase => Commands.set(aliase, prop));
    }
    if (prop.onLoad != undefined && typeof (prop.onLoad) == "function") prop.onLoad(client);
    console.log(`[COMMAND] A total of ${prop.conf.commands.length} supporters have been installed for ${file}.`);
});


console.log("--------------------------------");
console.log("Loading events...");
fs.readdirSync("./Events", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Events/${file}`);
    client.on(prop.conf.event, prop.execute);
    console.log(`[EVENT] ${file} is loaded.`);
});

console.log("--------------------------------");

console.log("| all is done starting bot now! |"),



client.on("ready", () => {
console.log("Bot is up and running!");
const statuschaning= [
      `p!ticket to open ticket`,
      `tickets`,
      "p!info"
  ]

  let i = 0;
  setInterval(() => client.user.setActivity(`${statuschaning[i++ % statuschaning.length]} | ${PREFIX}help`, { type: 'WATCHING'}), 5000)

});
clients.login(Token);
bot.login(Token);




