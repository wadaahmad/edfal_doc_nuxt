const querystring = require('querystring');
export default function (req: any, res: any, next: any) {
  // req is the Node.js http request object
  // const config = this.$config

  let body = '';

  req.on('data', (data: any) => {
    body += data;
  });

  req.on('end', () => {
    req.body = querystring.parse(body) || {};
    // console.log(body)
    // console.log(req.body)
    next();
  });

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  // next()
}