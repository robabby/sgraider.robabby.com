const keys = require('../config/keys');
const Giphy = require('giphy')(keys.giphyApiKey);
const Discord = require('discord.js');
const request = require('request');

const prefix = '!gif ';

// Create an instance of a Discord client
const client = new Discord.Client();
const token = keys.discordBotToken;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  let query = '';

  // if the author of the message is the bot, do nothing
  if (message.author.bot) return;

  // if the message has our appropriate prefix, handle the query
  if (message.content.indexOf(prefix) === 0) {
    query = message.content.substring(prefix.length, message.content.length);
    console.log("The query was: ", query);
  } else {
    return;
  }

  let sendResponse = function(payload) {
    console.log(payload);
    message.channel.send(payload);
  }

  let url = 'http://api.giphy.com/v1/gifs/search?q=';
  let key = 'dc6zaTOxFJmzC';
  let apiKey = '&api_key=' + key;
  let limit = '&limit=5'
  let offset = '&offset=0';

  let finalUrl = url + query + apiKey + limit + offset;

  console.log(finalUrl);

  var options = {
    url: finalUrl,
    method: 'GET',
    json:true
  }

  request(options, (error, response, body)=> {
    if (error) {
      console.log(error);
    } else if (!body.data[0]) {
      sendResponse("https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif");
    } else {
      sendResponse(body.data[0].images.fixed_height.mp4);
    }
  });

  return;
});

// Log our bot in
client.login(token);
