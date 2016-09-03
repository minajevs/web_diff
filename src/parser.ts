import * as request from 'request';
import * as fs from 'fs';
import * as diff from 'diff';
import {Promise} from 'es6-promise';

export interface IWebPage {
    url: string;
    name: string;
    location: [string, string];
    bothFilesExist: boolean;
    jar: any;
    setLogin(loginMethod: any);
    setCompareRule(compareMethod: any);
    setParseRule(parseMethod: any);
    setParseRule(parseRule: any);
    Run();
    Parse();
    Compare();
}


export class WebPage implements IWebPage{
    url: string;
    name: string;
    location: [string, string];
    bothFilesExist: boolean = false;
    jar: any;
    private _login: any;
    private _compareRule: any = str => {return str};
    private _parseRule: any = str => {return str};
    private _dir: string;
    private _promises: Promise[] = [];

    constructor(url: string, name: string) {
        this.url = url;
        this.name = name;
        this._dir = `./${this.name}`;
        this.location = [`${this._dir}/new.html`,
            `${this._dir}/old.html`];
    }

    setLogin = (loginMethod: any) => {
        this._login = loginMethod;
    }

    setCompareRule = (compareMethod: any) => {
        this._compareRule = compareMethod;
    }

    setParseRule = (parseRule: any) => {
        this._parseRule = parseRule;
    }

    Run = (callback?: any) => {
        console.log('parse');
        this._login(this, () => {
            this.Parse(() => {
                this.Compare();
            })
        })
    }

    Parse = (callback?: any) => {
        console.log('parse');
        if (!fs.existsSync(this._dir)) {
            fs.mkdirSync(this._dir);
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

    Compare = () => {
        console.log('comp');
        if (!this.bothFilesExist) return;
        let newPageStr = this._compareRule(fs.readFileSync(this.location[0], "utf-8"));
        let oldPageStr = this._compareRule(fs.readFileSync(this.location[1], "utf-8"));
        var d = diff.diffWords(oldPageStr, newPageStr);
        if (d.length > 1) {
            console.log(`${this.name} (${this.url}) updated!`);
            for (let part of d) {
                if (part.added || part.removed) {
                    console.log(`${part.added === true ? 'Added' : 'Removed'} : ${part.value}`);
                }
            }
            console.log(`Time: ${new Date().toLocaleString()}`);
        }
    }
}