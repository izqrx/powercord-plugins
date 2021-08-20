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

		const { body } = await get(`https://kitsu.io/api/edge/anime/?filter[text]=${args.join(" ")}`) //To check the bot from kitsu.io api 
   
      
      
          const string = [
            `${body.canonicalTitle}`,
            `Description: **${body.synopsis}**`,
            `Type: **${body.showType} - ${body.status}**`,
            `Episodes: **${body.episodeCount} || '???**`,
            `Start Date: **${body.startDate} ? new Date(`${body.startDate}`).toDateString() : '???'**`,
            `End Date: **${body.endDate} ? new Date(`${body.endDate}`).toDateString() : '???**`,
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
                              
