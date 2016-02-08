'use strict'

var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()
const PORT = 8000

app.get('/scrape', (req, res) => {
    let url = `http://taskwarrior.org/docs/advice.html`
    request(url, (err, res, html) => {
        if (err) console.error(`err ${err}`)
        if (!err) {
            let data = { title: '', lead: '' }
            let $ = cheerio.load(html)

            data.title = $('h3').first().text()
            data.lead = $('.lead').first().text()

            fs.writeFile('output.json', JSON.stringify(data, null, 4), (err) => {
                 console.log('File successfully written! - Check your project directory for the output.json file');
            })
        }
    })
})

app.listen(PORT)

module.exports = app
