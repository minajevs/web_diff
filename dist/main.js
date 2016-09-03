var webPage_1 = require("./webPage");
var webParser_1 = require('./webParser');
var parser = new webParser_1.WebPageParser();
parser.Add(new webPage_1.WebPage("www.dexie.me", "Dexies awesome blog!"));
parser.Add(new webPage_1.WebPage("www.example.com", "Another awesome website!"));
parser.Start();
