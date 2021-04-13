### PIX Generator

Application to build PIX QR CODE and String CODE on demand.

Inspired by two repos:
* [PIX-JS](https://github.com/gab618/pix-js)
* [WDEV](https://github.com/william-costa/wdev-qrcode-pix-estatico-php)

## Requirements
* NodeJS >= 10.0.0

## Enviroment Variables

* `API_TOKEN` -- token used to validate the request. Strongly recommended changing it!

## Request Endpoints

* `/generate-pix` -- Generate PIX QR CODE and returns SVG
* `/get-pix-code` -- Generate PIX CODE and return String

## Body for POST

`pixKey` and `amount` are required!

````json
{
  "pixKey": "123456",
  "amount": 1.00,
  "description": "Simple description of transaction",
  "merchantName": "Merchant name",
  "merchantCity": "Merchant City in capital letters without special charactes. example: SAO PAULO"
}
````