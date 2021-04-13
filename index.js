const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {API_TOKEN} = require('./constants');

const Pix = require('./Pix');

const qr = require('qr-image');

app.use((req, res, next) => {
    if (!req.headers.authorization || !(req.headers.authorization === API_TOKEN)) {
        res.status(403).json({message: 'access not allowed'});
        return;
    }

    try {
        validBodyRequest(req.body);
    } catch (e) {
        console.error('error validating body', e);
        res.status(400).json({message: e});
        return;
    }

    next();
})

const validBodyRequest = (body) => {
    if (!body) {
        throw new Error('body is invalid');
    }

    if (!body.pixKey) {
        throw new Error('pixKey is invalid');
    }

    if (!body.amount || parseFloat(body.amount) < 0.10) {
        throw new Error('amount is invalid or it is less than 10 cents')
    }
}

app.post('/generate-pix', async (req, res) => {
    try {
        res.type('svg');

        const pixPayload = new Pix(req.body.pixKey, req.body.description, req.body.merchantName, req.body.merchantCity, parseFloat(req.body.amount));

        const qrcode = qr.image(pixPayload.getPayload(), {type: 'svg'});

        qrcode.pipe(res);
    } catch (e) {
        console.error('error generating pix svg', e);
        res.sendStatus(500)
    }
})

app.post('/get-pix-code', async (req, res) => {
    try {
        const pixPayload = new Pix(req.body.pixKey, req.body.description, req.body.merchantName, req.body.merchantCity, parseFloat(req.body.amount));

        res.status(200).json({pixCode: pixPayload.getPayload()});
    } catch (e) {
        console.error('error generating pix code', e);
        res.sendStatus(500)
    }
})

const init = async () => {
    try {
        app.listen(3000, () => {
            console.log('server started on port 3000...');
        })
    } catch (e) {
        console.error("error initializing application", e);
        process.exit(1);
    }
}

init();