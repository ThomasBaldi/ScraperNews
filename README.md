# ScraperNews

ScraperNews is a personal project I made to test some basic knoledge on retrieving, saving and fetching data.

I came up with the idea of wanting to have 2 of my "go to" news platforms in a simple one-pager app that has 2 scrollable columns populated with titles, images and direct links to the articles.

Here is the actual deployed product if you'd simply like to see how it looks:
https://scraper-news.cyclic.app/

## Installation

- Download the main branch of the repository with all its documents.

- Unzip the files and save the folder in a folder somewhere on your computer.

- Open such folder in VScode and make sure you are in the right directory.

- Open the terminal and run `NPM install` to make sure that all dependencies are installed correctly and at their latest version.

- Run `NPM start` in your terminal. This will start the server at http://localhost:3000

## Dependencies in use

For routing and HTTP requests:

- Axios: (a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser)
- Express: ( a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications)

For portraying/managing/styling the frontend:

- EJS: (a templating engine for javascript)
- Bootstrap: (a responsive website and mobile first CSS framework)
- cheerio: markup parser that provides an API for traversing/manipulating the resulting data structure
- cors: browser mechanism which enables controlled access to resources located outside of a given domain

Middlewares for parsing/handling errors and more:

- cookie-parser (a middleware that parses cookies attached to the client request object)
- morgan (a middleware to log HTTP requests and errors)
- debug (Express uses the debug module internally to log information about route matches, middleware functions that are in use, application mode, and the flow of the request-response cycle. debug is like an augmented version of console.)
- http-errors (generating errors for node.js applications)
- fs and path (file system module and path modules, used to acces/read/write files and paths)

# How the app works

In a very simple way, as soon as the user lands on the homepage, an http call is made, which triggers a tailor made scraping of 2 news websites.
This occurs with axios calls.

Such scraping retrieves titles, url links and image links and stores them in an array, there's an array for each website.

Thereafter, the arrays data is stored by writing 2 respectiv json files.

Such jsons files are then read and rendered in the index.ejs page.

The index.ejs is set up to portray every single retrieved object that is stored in the arrays, in 2 separate columns, with a small box that has a title, url addresses that directly links to the relevant article and, if available, a relevant picture.

This project was set up to ease my news browsing habits but most importantly to test some of the fundamentals I've learned during my developer studies.

I realize the same or even better result could be achieved by utilizing for example some scraping-specific api. One could also for example have a filtering system set up,so that a user could choose which news papers' articles to have portrayed in the columns.

## Support

For any issues and queries regarding the application please contact the developer at:
baldithomas@hotmail.it

## Authors

Thomas Baldi

## License

ISC
