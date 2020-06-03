const axios = require("axios");
const cheerio = require("cheerio");
const config = require("./config.js");

//animenewsnetwork id's go up to about 23333 as of 6/1/2020
let randime = Math.floor(Math.random() * 23333);
let url = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=";
let name;
let type;
let sentenceStart = [
  "Dad!!!! I'm",
  "Dad get out!!! I'm",
  "GET OUT DAD...I'm",
  "Dad don't come in here!!! I'm",
  "UGH, I'm",
];

async function getStuff() {
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

function createString(n, t) {
  let randStart =
    sentenceStart[Math.floor(Math.random() * sentenceStart.length)];
  let randExclamation = "!".repeat(Math.floor(Math.random() * 5));
  if (t === "manga") {
    console.log(`${randStart} reading ${n}${randExclamation}`);
  } else {
    console.log(`${randStart} watching ${n}${randExclamation}`);
  }
}

async function main() {
  console.log(`the random number is...${randime}`);
  await getStuff();
  await createString(name, type);
}

main();
