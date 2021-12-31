import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral'
import moment from "moment";

export default function (app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0') + ' VND';
            },
            format_date(val) {
                return moment(val).format('ll');
            },
            format_date_until_now(val) {
                return moment(val).fromNow();
            },
            format_date_calendar(val) {
                return moment(val).calendar();
            },
            format_name(name){
                const str = name.split(' ');
                const n = str.length;
                return '****' + str[n-1];
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
  }