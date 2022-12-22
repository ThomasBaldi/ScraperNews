//creating an echo server that will help not being detected and blocked by sites

const axios = require('axios');

const config = {
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
	},
};

axios.get('https://httpbin.org/headers', config).then(({ data }) => {
	console.log(data);
});
