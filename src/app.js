import Vue from 'vue';

document.addEventListener('DOMContentLoaded',() => {
  new Vue({
    el: "#app",
    data: {
      rates: '',
      fromCurrency: null,
      toCurrency: null,
      amount: 0
    },
    mounted(){
      this.fetchRates()
    },
    computed: {
      convertCurrency: function() {
        if (this.amount > 0 && this.toCurrency != null && this.fromCurrency != null) {
          let result = (this.amount * this.toCurrency) / this.fromCurrency;//Rule of three - if 1eur = 3usd and 1gbp is 2 eur: 3-2 100-x?
          return result.toFixed(2);
        }
      },
    },
    methods: {
      fetchRates: function(){
        const request = fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(data => {
          let rates = data.rates;//
          rates['EUR'] = 1;//assignig eur
          this.rates = data.rates;
        })
      }
    }
  })
})
