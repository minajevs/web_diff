var webPage_1 = require("./webPage");
var ortusExtension_1 = require('./ortusExtension');
var webParser_1 = require('./webParser');
var parser = new webParser_1.WebPageParser();
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=96024", "Bakalaura darbs")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=96033", "Datoru organizācija un asambleri")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=96012", "Funkcionālā programmēšana")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=95336", "Lielu datu bāzu tehnoloģija")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=95326", "Mākoņskaitļošana")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=95338", "Mākslīgā intelekta pamati")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=96028", "Programmatūras attīstības tehnoloģijas")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=96037", "Sistēmu analīze un zināšanu iegūšana")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Add(new webPage_1.WebPage("https://estudijas.rtu.lv/course/view.php?id=95554", "Uzņēmējdarbības ekonomika un tirgzinību pamati")
    .setParseRule(ortusExtension_1.OrtusExtension.parseRule)
    .setLogin(ortusExtension_1.OrtusExtension.logIn));
parser.Start();
