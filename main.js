const axios = require("axios");
const cheerio = require("cheerio");
// const config = require("./config.js");
const Twitter = require("twitter");

let config = {
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
};
let client = new Twitter(config);
//animenewsnetwork id's go up to about 23333 as of 6/1/2020
let randime = Math.floor(Math.random() * 23333);
let url = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=";
let name, type, tweet;
let sentenceStart = [
  "Dad!!!! I'm",
  "Dad get out!!! I'm",
  "GET OUT DAD...I'm",
  "Dad don't come in here!!! I'm",
  "UGH, I'm",
];

async function getTitle() {
  try {
    let res = await axios.get(`${url}${randime}`);
    let $ = cheerio.load(res.data, {
      xmlMode: true,
    });
    name = $("ann anime").attr("name") || $("ann manga").attr("name");
    type = $("ann anime").attr("type") || $("ann manga").attr("type");
    // console.log(name);
    // console.log(type);
  } catch (error) {
    console.log(error);
  }
}

function createString() {
  let randStart =
    sentenceStart[Math.floor(Math.random() * sentenceStart.length)];
  let randExclamation = "!".repeat(Math.floor(Math.random() * 5));
  if (type === "manga") {
    tweet = `${randStart} reading ${name}${randExclamation}`;
  } else {
    tweet = `${randStart} watching ${name}${randExclamation}`;
  }
}

function tweetString() {
  if (name == undefined) {
    return;
  }
  client.post("statuses/update", { status: tweet }, function (
    error,
    tweet,
    response
  ) {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    // console.log(response); // Raw response object.
  });
}

async function main() {
  console.log(`the random number is...${randime}`);
  await getTitle();
  await createString();
  await tweetString();
}

main();
