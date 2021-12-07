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
                return moment(val).format('lll');
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
  }