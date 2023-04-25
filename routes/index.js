const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
const path = require('path');

const exApp = express();
exApp.use(cors());

//news pages to be scraped
const urlAnsa = 'https://www.ansa.it/sito/notizie/mondo/mondo.shtml?refresh_ce';
const urlAften = 'https://www.aftenposten.no/nyheter/';

//scraper function
const getData = async () => {
	await axios
		.get(urlAnsa)
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
			fs.writeFileSync(path.resolve(__dirname, '../data/ansa.json'), JSON.stringify(ansaNews));
		})
		.catch((err) => console.log(err));

	await axios
		.get(urlAften)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const aftenNews = [];
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
			fs.writeFileSync(path.resolve(__dirname, '../data/aften.json'), JSON.stringify(aftenNews));
		})
		.catch((err) => console.log(err));
};

//call function to scrape and rewrite json files and render them
exApp.get('/', (req, res, next) => {
	getData();
	//read stored jsons and render the 2 news columns
	let ansa = fs.readFileSync(path.resolve(__dirname, '../data/ansa.json'));
	let aften = fs.readFileSync(path.resolve(__dirname, '../data/aften.json'));

	res.render('index', {
		ansa: JSON.parse(ansa),
		aften: JSON.parse(aften),
	});
});

module.exports = exApp;
