const Express = require('express');
const Logger = require('morgan');
const PORT=4545;
const ADDRESS='127.0.0.1';
const App = Express();

App.listen(PORT, ADDRESS, () => {
  console.log(`Server is listening on port http://${ADDRESS}:${PORT}`);
})

App.set('view engine', 'ejs'); // this selects EJS as our templating language
App.use(Logger('dev'));

App.get('/', (request, response) => {
  response.render('index', {
    amount: null,
    tax: null,
    tip: null,
    number_of_people: null,
    amount_each: null,
  });
})

App.get('/bill_splitter_form_submit', (request, response) => {
  const params = request.query;
  console.log(params)
  const { amount, tax, tip, number_of_people } = params
  let amount_each = (parseInt(amount) + parseInt(amount) * parseInt(tax)/ 100 + parseInt(amount) * parseInt(tip) / 100) / parseInt(number_of_people)
  response.render('index', {
    amount,
    tax,
    tip,
    number_of_people,
    amount_each: amount_each,
  });
})

