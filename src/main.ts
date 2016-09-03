import {WebPage} from "./webPage";
import {WebPageParser} from './webParser';

let parser = new WebPageParser();

parser.Add(new WebPage("www.dexie.me", "Dexies awesome blog!"));
parser.Add(new WebPage("www.example.com", "Another awesome website!"));

parser.Start();