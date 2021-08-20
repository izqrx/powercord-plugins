const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule } = require('powercord/webpack');

const { get } = require("powercord/http");

module.exports = class Anime extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "anime",
      description: "Searches for anime",
      usage: "{c} [username]",
      executor: async (args) => {
        
    try {

   	   const { body } = await get(`https://kitsu.io/api/edge/anime/?filter[text]=${args.join(" ")}`)
      
          const string = [
            `${body.data[0].attributes.canonicalTitle}`,
            `Description: **${body.data[0].attributes.synopsis}**`,
            `Type: **${body.data[0].attributes.showType} - ${body.data[0].attributes.status}**`,
            `Episodes: **${body.data[0].attributes.episodeCount}**`,
            `Start Date: **${body.data[0].attributes.startDate}**`,
            `End Date: **${body.data[0].attributes..endDate}**`,
          ].join("\n");
      
                return {
            send: false,
            result: string,
          };
        } catch (e) {
          return {
            result: `Error: ${e}`
          };
        }
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("anime");
  }
};
                              
