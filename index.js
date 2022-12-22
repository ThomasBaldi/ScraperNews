const PORT = 8000;

const axios = require('axios'); //a promised-based HTTP client for JavaScript (make request and handle transformation of response data)
//axios version 1.1.3 !!! (npm i axios@1.1.3)
const cheerio = require('cheerio'); //server side based implemantation of jQuery
const express = require('express'); //node.js web app framework for web and mobile apps
const cors = require('cors'); //an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources

//express starter
const exApp = express();
exApp.use(cors());

//news pages to be scraped
const urlAnsa = 'https://www.ansa.it/sito/notizie/mondo/mondo.shtml?refresh_ce';
const urlAften = 'https://www.aftenposten.no/nyheter/';
const urlWired = 'https://www.wired.com/tag/open-source/';

/* app.METHOD(PATH, HANDLER); //routing formula with express */

/* exApp.get() // get data
exApp.post() //add
exApp.put() // edit
exApp.delete() // delete */

exApp.get('/newsAnsa', (req, res) => {
	axios(urlAnsa)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const ansaNews = [];
			//headliner world news
			$('.news-inner', html).each(function () {
				const title = $(this).find('.pp-title').text();
				const url = $(this).find('a').attr('href');
				const img = $(this).prev().find('img').attr('src');
				ansaNews.push({
					title,
					url,
					img,
				});
			});
			// headlining follow up news
			$('.news-inner > .news-more > li', html).each(function () {
				const title = $(this).find('a').text();
				const url = $(this).find('a').attr('href');
				ansaNews.push({
					title,
					url,
				});
			});
			//world news
			$('.news', html).each(function () {
				const title = $(this).find('.news-title').find('a').text();
				const url = $(this).find('.news-title').find('a').attr('href');
				const img = $(this).find('img').attr('data-src');
				ansaNews.push({
					title,
					url,
					img,
				});
			});
			res.json(ansaNews);
		})
		.catch((err) => console.log(err));
});

axios.get('https://www.aftenposten.no/nyheter/', {
	headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
});

exApp.get('/newsAften', (req, res) => {
	axios(urlAften)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const aftenNews = [];
			$('article', html).each(function () {
				const title2 = $(this).find('img').attr('alt');
				const url2 = $(this).find('a').attr('href');
				const img2 = $(this).attr('data-pulse-teaser-image');
				aftenNews.push({
					title2,
					url2,
					img2,
				});
			});
			res.json(aftenNews);
		})
		.catch((err) => console.log(err));
});

exApp.get('/newsWired', (req, res) => {
	axios(urlWired)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const wiredNews = [];
			$('.SummaryItemWrapper-gcQMOo', html).each(function () {
				const title3 = $(this).find('h3').text();
				const url3 = $(this).find('.hYdAev').attr('href'); //find the right link
				wiredNews.push({
					title3,
					url3,
				});
			});
			res.json(wiredNews);
		})
		.catch((err) => console.log(err));
});

exApp.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
