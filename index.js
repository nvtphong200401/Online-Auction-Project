import express from 'express';
import viewMdware from './middleware/view.mdware.js';
import routesMdware from './middleware/routes.mdware.js';

const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));
//delete this later
app.get('/', function (req, res) {
    res.render('home');
});

viewMdware(app);
routesMdware(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})