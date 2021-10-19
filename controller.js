import axios from 'axios';
import cheerio from 'cheerio';

import { newspapers } from './newspapers.js';

export const homeGreeting = (req, res) => {
	res.json('Welcome to Climate Change API');
};

export const getNews = async (req, res) => {
	let articles = [];

	for (const newspaper of newspapers) {
		const response = await axios.get(newspaper.address);
		const html = response.data;
		const $ = cheerio.load(html);

		$('a:contains("climate")', html).each(function () {
			const title = $(this).text();
			const url = $(this).attr('href');
			articles.push({
				title,
				url: newspaper.baseUrl + url,
				source: newspaper.name,
			});
		});
	}

	res.json(articles);
};

export const getNewsFromId = async (req, res) => {
	const newspaperId = req.params.newspaperId;
	const articles = [];
	const newspaper = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0];

	const response = await axios.get(newspaper.address);
	const html = response.data;
	const $ = cheerio.load(html);

	$('a:contains("climate")', html).each(function () {
		const title = $(this).text();
		const url = $(this).attr('href');
		articles.push({
			title,
			url: newspaper.baseUrl + url,
			source: newspaper.name,
		});
	});

	res.json(articles);
};
