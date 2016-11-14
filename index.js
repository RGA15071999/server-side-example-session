const express = require('express');
const body_parser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const app = express();
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan')('dev');
const FileStore = require('session-file-store')(session);
const FormBox = require('./app');

app.use(body_parser.json());

app.use(helmet());
app.use(morgan);

const r = 
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.js';
const r_dom = 
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.js';

const renderer = prerendered => {
  return `
<!doctype html>
<html>
  <head>
    <script src=${r}></script>
    <script src=${r_dom}></script>
    <title> Simple server side renderer example </title>
  </head>
  <body>
    <div id="container"> ${prerendered} </div>
    <script src="bundle.js"></script>
  </body>
</html>
`;
};

app.use(express.static('.'));

app.use(session({
  name:'server-session-cookie-id',
  secret: 'some secret',
  saveUninitialized : true,
  resave:true,
  store: new FileStore 
}));

app.post('/submit',
	 body_parser.json(),
	 body_parser.urlencoded({ extended: true }),
	 (req, res) => {
	   console.log(req.body);
	   res.end('Finished');
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const payload = renderer(ReactDOMServer.renderToString(<FormBox/>));
  res.end(payload);
  // if (req.session.views === undefined) {
  //   req.session.views = 1;
  // } else {
  //   req.session.views++;
  // }
  // res.end(`<p>views: ${req.session.views}</p>`);
});

const server = app.listen(4000, () => {
  console.log('Running on', 4000);
});
