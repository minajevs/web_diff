import {WebPage} from "./webPage";
import {OrtusExtension} from './ortusExtension';
import {WebPageParser} from './webParser';


let parser = new WebPageParser();
parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=96024", "Bakalaura darbs")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=96033", "Datoru organizācija un asambleri")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=96012", "Funkcionālā programmēšana")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=95336", "Lielu datu bāzu tehnoloģija")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=95326", "Mākoņskaitļošana")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=95338", "Mākslīgā intelekta pamati")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=96028", "Programmatūras attīstības tehnoloģijas")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=96037", "Sistēmu analīze un zināšanu iegūšana")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));

parser.Add(new WebPage("https://estudijas.rtu.lv/course/view.php?id=95554", "Uzņēmējdarbības ekonomika un tirgzinību pamati")
    .setParseRule(OrtusExtension.parseRule)
    .setLogin(OrtusExtension.logIn));


parser.Start();