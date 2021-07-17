const Discord = require("discord.js");
const client = new Discord.Client({
  intents: Discord.Intents.FLAGS.GUILD_MESSAGES
});
async function placeComponents() {
  const guild = await client.guilds.fetch("750031320205230311");
  /**@type {Discord.TextChannel} */
  const channel = await guild.channels.fetch("750031320205230314", {
    allowUnknownGuild: true,
  });
  const placed = await channel.send({
    content: "test",
    components: [
      new Discord.MessageActionRow().addComponents(new Discord.MessageButton({
        label: "enabled",
        customId: "enabled-button",
        style: "PRIMARY",
      }), new Discord.MessageButton({
        label: "disabled",
        customId: "disabled-button",
        style: "SECONDARY",
        disabled: true,
      })),
      new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu({
        customId: "select",
        maxValues: 2,
        minValues: 1,
        options: new Array(25).fill(null).map((_, i) => i).map(e => ({
          label: String(e),
          value: String(e)
        }))
      }))
    ]
  });
  await channel.awaitMessages({
    filter: msg => msg.content === "update",
    max: 1
  });
  await placed.edit({
    content: "close",
    components: []
  });
}
client.once("ready", () => {
  client.on("interactionCreate", (interaction) => {
    console.log(JSON.stringify(interaction.toJSON(), undefined, 2));
    interaction.reply({ content: "received", ephemeral: true });
  });
  console.log("ready");
  placeComponents().catch(console.error);
});
client.login();
