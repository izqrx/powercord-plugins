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
        
           function shorten(text, maxLen = 2000) { //Let’s tell the bot that the maximum number of characters is 2000
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}
    const query = args.join(' '); //After entering the name
    try {
		const { text } = await request //From here, the bot will start searching for your request 
			.get('https://kitsu.io/api/edge/anime') //To check the bot from kitsu.io api 
			.query({ 'filter[text]': query }); //The bot starts collecting the search results
		const body = JSON.parse(text); //after done let's check 
		if (!body.data.length) {
      
                  return {
              result: "No user found"
            }
    }
      
		const data = body.data[0].attributes; //Let's extract the data
      
          const string = [
            `${data.canonicalTitle}`,
            `Description: **${shorten(data.synopsis)}**`,
            `Type: **${data.showType} - ${data.status}**`,
            `Episodes: **data.episodeCount || '???**`,
            `Start Date: **data.startDate ? new Date(data.startDate).toDateString() : '???'**`,
            `End Date: **data.endDate ? new Date(data.endDate).toDateString() : '???**`,
          ].join("\n");
      
                return {
            send: true,
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
    powercord.api.commands.unregisterCommand("anime);
  }
};
                              
