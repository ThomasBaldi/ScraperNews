const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const exApp = express();
exApp.use(cors());

//news pages to be scraped
const urlAnsa = 'https://www.ansa.it/sito/notizie/mondo/mondo.shtml?refresh_ce';
const urlAften = 'https://www.aftenposten.no/nyheter/';

exApp.get('/', async (req, res, next) => {
	//scrape and store ansa news in ansaNews array
	var ansaNews = [];
	await axios
		.get(urlAnsa)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
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
			// headlining followup news
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
		})
		.catch((err) => console.log(err));

	//scrape and store aftenposten news in aftenNews array
	var aftenNews = [];
	await axios
		.get(urlAften)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			$('article', html).each(function () {
				const title = $(this).find('img').attr('alt');
				const url = $(this).find('a').attr('href');
				const img = $(this).attr('data-pulse-teaser-image');
				aftenNews.push({
					title,
					url,
					img,
				});
			});
		})
		.catch((err) => console.log(err));

	res.render('index', {
		ansa: ansaNews,
		aften: aftenNews,
	});
});

module.exports = exApp;
