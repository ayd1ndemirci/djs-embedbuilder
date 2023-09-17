const {Client, GatewayIntentBits, Partials, EmbedBuilder} = require('discord.js');
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require('discord.js');
const { readdirSync } = require('fs');
const { token }  = require('./config.json');

const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;

client.commands = (global.commands = []);


readdirSync('./src').forEach(f => {
    if (!f.endsWith('.js')) return;

    const props = require(`./src/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });
});

readdirSync('./events').forEach(e => {
    const event = require(`./events/${e}`);
    const name = e.split('.')[0];

    client.on(name, (...args) => {
        event(client, ...args)
    });
});

client.login(token);