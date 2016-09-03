# Introduction

This is a pretty fast script to monitor changes on specified webpages. Built using TypeScript and requestjs. 

# How to use

# How to use
## Prerequisites

* NodeJS (>6.0.0)
* NPM

## Installation
1. Download repository and unzip it somewhere
2. In `src\config.ts` Change {USERNAME} and {PASSWORD} to your ORTUS Username and Password respectively.
3. In `main.ts` add 
```javascript 
parser.Add(new WebPage("{LINK}", "{NAME}")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));
``` 
for every course you wish to monitor (change {link} and {name} to course link and friendly name respectively). Script is preconfigured for all my courses, so you can just replace links and names.  
4. `npm install`
5. `npm start`

##How it works
After your first launch it downloads website data under `parseData\{name}`. After that every minute it will update website data, check if there are some changes on the page. If there are - it logs information about changes in command window, `differences.txt` log file, and backs-up previous version of the page.

## API-Reference
Lazy me, but I only added API that I need. Also, project is still not documented, so here I will introduce quick docs.

`WebPage` - virtual web page, object which stores all neccessary info to download, parse and check difference on the web page. 
`Run()` launches update routine. Logs in if needed, parses and saves webpage, compares to previous version. When ends fires 'runComplete' event.

`WebPageParser` - multiple WebPage container. Takes care of the loops, logging and other necessary stuff. 

TODO

# License

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
