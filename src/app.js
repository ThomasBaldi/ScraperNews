//get the html element to populate with the scraped data
const divAnsa = document.querySelector('#feedAnsa');
const divAften = document.querySelector('#feedAften');
const divWired = document.querySelector('#feedWired');

//populate html with ansa news
fetch('http://localhost:8000/newsAnsa') //promise response
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		data.forEach((article) => {
			if ((article.title, article.url, article.img)) {
				const articleItem =
					`<div class="Article container-fluid p-2 mb-3 bg-dark rounded"><h3>
                    <a style="text-decoration-line: none;" class="link-light" href="https://www.ansa.it` +
					article.url +
					`" target="blank">` +
					article.title +
					`<img src="https://www.ansa.it` +
					article.img +
					`" class="img-fluid w-100 rounded mt-1"></a></h3></img></div>`;
				divAnsa.insertAdjacentHTML('beforeend', articleItem);
			} else {
				const articleItem =
					`<div class="Article container-fluid p-2 mb-3 bg-dark rounded"><h3>
                    <a style="text-decoration: none;" class="text-light" href="https://www.ansa.it` +
					article.url +
					`" target="blank">` +
					article.title +
					`</a></h3></div>`;
				divAnsa.insertAdjacentHTML('beforeend', articleItem);
			}
		});
	})
	.catch((err) => console.log(err));

//populate html with aftenposten news
fetch('http://localhost:8000/newsAften') //promise response
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		data.forEach((article) => {
			//aftenposten articles
			const articleItem =
				`<div class="Article container-fluid p-2 mb-3 bg-dark rounded"><h3>
                    <a style="text-decoration-line: none;" class="link-light" href="` +
				article.url2 +
				`" target="blank">` +
				article.title2 +
				`<img src="` +
				article.img2 +
				`" class="img-fluid w-100 rounded mt-1"></a></h3></img></div>`;
			divAften.insertAdjacentHTML('beforeend', articleItem);
		});
	})
	.catch((err) => console.log(err));

//populate html with wired news
fetch('http://localhost:8000/newsWired') //promise response
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		data.forEach((article) => {
			//aftenposten articles
			const articleItem =
				`<div class="Article container-fluid p-2 mb-3 bg-dark rounded"><h3>
                    <a style="text-decoration-line: none;" class="link-light" href="https://www.wired.com` +
				article.url3 +
				`" target="blank">` +
				article.title3;
			divWired.insertAdjacentHTML('beforeend', articleItem);
		});
	})
	.catch((err) => console.log(err));
