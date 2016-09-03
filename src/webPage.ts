import * as request from 'request';
import * as fs from 'fs';
import * as diff from 'diff';
import {Promise} from 'es6-promise';

export interface IWebPage {
    url: string;
    name: string;
    location: [string, string];
    bothFilesExist: boolean;
    dir: string;
    jar: any;
    setLogin(loginMethod: any);
    setCompareRule(compareMethod: any);
    setParseRule(parseMethod: any);
    setParseRule(parseRule: any);
    Run();
    Parse();
    Compare();
    on(eventName: string, callback: any);
}


export class WebPage implements IWebPage {
    url: string;
    name: string;
    location: [string, string];
    bothFilesExist: boolean = false;
    jar: any;
    dir: string;
    private _login: any;
    private _compareRule: any = str => { return str };
    private _parseRule: any = str => { return str };
    private _promises: Promise[] = [];
    private _eventDictionary: { [event: string]: any; } = [];
    //compared, pageUpdated

    constructor(url: string, name: string) {
        this.url = url;
        this.name = name;
        this.dir = `./parseData/${this.name}`;
        this.location = [`${this.dir}/new.html`,
            `${this.dir}/old.html`];

        //ensure default events
        this._eventDictionary['compared'] = () => { };
        this._eventDictionary['pageUpdated'] = () => { };

        return this;
    }

    setLogin = (loginMethod: any) => {
        this._login = loginMethod;
        return this;
    }

    setCompareRule = (compareMethod: any) => {
        this._compareRule = compareMethod;
        return this;
    }

    setParseRule = (parseRule: any) => {
        this._parseRule = parseRule;
        return this;
    }

    Run = (callback?: any) => {
        this._login(this, () => {
            this.Parse(() => {
                this.Compare(() => {
                    this._eventDictionary['runComplete']();
                }
                );
            })
        })
    }

    Parse = (callback?: any) => {
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }

        if (fs.existsSync(this.location[0])) {
            this._promises.push(new Promise((resolve, reject) => {
                fs.createReadStream(this.location[0]).pipe(fs.createWriteStream(this.location[1]).on('finish', resolve));
                this.bothFilesExist = true;
            }));
        }

        Promise.all(this._promises).then(() => {
            request({
                url: this.url,
                method: "GET",
                jar: this.jar
            }, (err, response, body) => {
                body = this._parseRule(body);
                fs.writeFile(this.location[0], body, (err) => {
                    if (err) return console.log(err);
                    callback();
                });
            });
        });
    }

    Compare = (callback?: any) => {
        if (this.bothFilesExist) {
            let newPageStr = this._compareRule(fs.readFileSync(this.location[0], "utf-8"));
            let oldPageStr = this._compareRule(fs.readFileSync(this.location[1], "utf-8"));
            var d = diff.diffWords(oldPageStr, newPageStr);
            if (d.length > 1) {
                console.log(`${this.name} (${this.url}) updated!`);
                this._eventDictionary['pageUpdated'](this, d);
                for (let part of d) {
                    if (part.added || part.removed) {
                        console.log(`${part.added === true ? 'Added' : 'Removed'} : ${part.value}`);
                    }
                }
                console.log(`Time: ${new Date().toLocaleString()}`);
            }
            this._eventDictionary['compared']();
        }
        callback();
    }

    on = (eventName: string, callback: any) => {
        this._eventDictionary[eventName] = callback;
    }
}