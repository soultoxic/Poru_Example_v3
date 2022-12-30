const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Poru } = require('poru');
const client = new Client({
  failIfNotExists: true,
  allowedMentions: {
    parse: ['roles', 'users', 'everyone'],
    repliedUser: false,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.config = require('./config.json');
client.poru = new Poru(client, client.nodes.nodes, {
    clientID: 'cb41529dc3bd4d8f8a240dbee0fff4e8',
    clientSecret: 'bcca82f42930498aa385a8289fdf276b',
    playlistLimit: 5,
});
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

['commands', 'events', 'slash', 'poruEvent'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});


client.login(process.env.TOKEN);
