const express = require('express')
const cors = require('cors')
const axios =require('axios')
require('dotenv').config()
const path = require('path');

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})

app.get('/news',(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://crypto-news-live3.p.rapidapi.com/news',
        headers: {
          'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      };
  
      axios.request(options).then(function (response) {
        res.json(response.data)
      }).catch(function (error) {
        console.error(error);
      });
})


app.get('/convert',(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: req.query.from_currency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: req.query.to_currency},
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
        };

        axios.request(options).then(function (response) {
            res.json(parseFloat(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]).toFixed(4));
        }).catch(function (error) {
            console.error(error);
        });
})