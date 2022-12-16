import { createMurkup, createMurkupMin } from './create';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { get } from 'lodash';
import Notiflix from 'notiflix';
const { Notify } = Notiflix;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;
const removeFunc = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};
const input = document.querySelector('#search-box');
const onInput = event => {
  let country = '';
  const { target } = event;
  if (target.value === '') {
    removeFunc();
    return;
  }
  country = target.value.toLowerCase().trim();

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (response.status === 404 && target.value !== '') {
        Notify.failure('Oops, there is no country with that name');
        removeFunc();
        return;
      }
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length <= 10) {
        console.log(data);
        const previue = createMurkupMin(data);
        countryInfo.innerHTML = '';
        countryList.innerHTML = previue;
      }
      if (data.length === 1) {
        const markupList = createMurkup(data);
        countryList.innerHTML = '';
        countryInfo.innerHTML = markupList;
      }

      // Data handling
    })
    .catch(error => {
      // Error handling
      console.log(error);
    });
};

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
