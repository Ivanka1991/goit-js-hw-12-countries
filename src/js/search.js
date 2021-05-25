import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryListTpl from '../templates/countryList.hbs';
import countryCardTpl from '../templates/countryCard.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  inputSearch: document.querySelector('.input-search'),
  jsCardContainer: document.querySelector('.js-card-container'),
};

let searchCountry = '';

refs.inputSearch.addEventListener(
  'input',
  debounce(() => {
    onSearch();
  }, 500),
);

function onSearch() {
  searchCountry = refs.inputSearch.value;
  if (searchCountry) {
    fetchCountries(searchCountry).then(countryCheck).catch(onFetchError);
  }
  if (!searchCountry) {
    clearMarkup();
  }
}
function onFetchError(error) {
  console.log(error);
}
function countryCheck(country) {
  if (country.length > 10) {
    clearMarkup();
    tooMuch();
  } else if (country.length <= 10 && country.length > 1) {
    clearMarkup();
    renderCountryCard(countryListTpl, country[0]);
  } else if (country.length === 1) {
    clearMarkup();
    renderCountryCard(countryCardTpl, country[0]);
  }
}

function renderCountryCard(template, country) {
  const markup = template(country);
  console.log(markup);
  refs.jsCardContainer.innerHTML = markup;
}

function tooMuch() {
  error({
    tittle: 'Ахтунг!Ахтунг',
    text: 'Слишком много совпадений!Введи больше текста!',
  });
}
function clearMarkup() {
  refs.jsCardContainer.innerHTML = '';
}
