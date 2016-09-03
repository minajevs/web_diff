import {IWebPage} from './webPage';
import * as fs from 'fs';

export class WebPageParser {
    private _pages: Array<IWebPage> = [];
    private _interval: number;
    private _timer: any;
    private _updating: boolean = false;
    private _logger: Logger = new Logger(new Date().toDateString() + '.txt');
    private _diffLogger: Logger = new Logger('differences.txt');
    public lastUpdate: Date;
    get count(): number { return this._pages.length; };

    constructor(interval: number = 60) {
        this._interval = interval * 1000;
    }

    private _logDiff = (page: IWebPage, difference: any) => {
        this._logger.Log(
            `
            Found difference at ${page.name}, on ${new Date().toString()}.`
        );
        let diffStr = '';
        for (let part of difference) {
            if (part.added || part.removed) {
                diffStr += '\r\n' + '--' + (part.added === true ? 'Added' : 'Removed') + ' : '
                    + '\r\n' + part.value;
            }
        }
        let time = new Date().getTime().toString();
        this._diffLogger.Log(
            `
            =============${page.name}=============
            ${new Date().toString()}
            ${time}.html
            
            ${diffStr}
            `
        );
        this._diffLogger.saveBackup(page, time);
    }

    Add = (page: IWebPage) => {
        page.on('pageUpdated', this._logDiff);
        this._pages.push(page);

    }

    Remove = (page: IWebPage) => {
        let index = this._pages.indexOf(page);
        this._pages.splice(index, 1);
    }

    Start = () => {
        if (this._timer) return;
        this._timer = setInterval(() => {
            this.Update();
        }, this._interval);
    }

    Stop = () => {
        clearInterval(this._timer);
        this._timer = null;
    }

    Update = () => {
        if (!this._updating) {
            this._logger.Log(
                `
                ================updating================
                ${new Date().toString()}`
            );
            this._updating = true;
            let i = 0;
            let self = this;
            function _update() {
                if (i < self._pages.length) {
                    let page = self._pages[i];
                    page.on('runComplete', () => {
                        i++;
                        _update();
                    })
                    page.Run();
                } else {
                    self._updating = false;
                    self.lastUpdate = new Date();
                }
            }
            _update();
        } else {
            console.log(`can't start new update yet`);
        }
    }
}

class Logger {
    filename: string;
    constructor(filename: string) {
        this.filename = filename;
    }

    Log = (str: string) => {
        if (!fs.existsSync(this.filename)) {
            fs.writeFile(this.filename, `New log create at ${new Date().toString()}`, (err) => {
                if (err) console.log(err);
            });
        }
        fs.appendFile(this.filename, dedent(str), (err) => {
            if (err) console.log(err);
        });
    }

    saveBackup = (page: IWebPage, timestamp: string) => {
        fs.createReadStream(page.location[1]).pipe(fs.createWriteStream(page.dir + '\\' + timestamp + '.html'));
    }
}

function dedent(callSite, ...args) {

    function format(str) {

        let size = -1;

        return str.replace(/\n(\s+)/g, (m, m1) => {

            if (size < 0)
                size = m1.replace(/\t/g, "    ").length;

            return "\n" + m1.slice(Math.min(m1.length, size));
        });
    }

    if (typeof callSite === "string")
        return format(callSite);

    if (typeof callSite === "function")
        return (...args) => format(callSite(...args));

    let output = callSite
        .slice(0, args.length + 1)
        .map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
        .join("");

    return format(output);
}