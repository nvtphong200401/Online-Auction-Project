import { engine } from 'express-handlebars';
import numeral from 'numeral'

export default function (app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: 'guest.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0') + ' VND';
            },
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
  }