import * as cheerio  from 'cheerio';
import * as request from 'request';
import {IWebPage} from './webPage';
import {OrtusConfig} from './config';

export class OrtusExtension {
    static parseRule = (pageContent: string): string => {
        let $ = cheerio.load(pageContent);
        return $('.course-content').html();
    }

    static logIn = (page: IWebPage, callback?: any) => {
        request({
            url: OrtusConfig.ORTUS_URL,
            method: "GET",
            jar: page.jar
        }, (err, response, body) => {
            if (body.indexOf(OrtusConfig.CHECK_STRING) !== -1) {
                callback();
            } else {
                page.jar = request.jar();
                request({
                    url: OrtusConfig.LOGIN_URL,
                    method: "POST",
                    form: {
                        IDToken1: OrtusConfig.USERNAME,
                        IDToken2: OrtusConfig.PASSWORD
                    },
                    jar: page.jar
                }, function () {
                    callback();
                });
            }
        });
    }
}