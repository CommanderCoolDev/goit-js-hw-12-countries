import API from './js/fetchCountries.js';
import getRefs from './js/refs.js';// импорт ссылок
import countryInformation from './templates/country-information.hbs';// импорт описания из шаблонника
import countriesList from './templates/countries-list.hbs';// импорт списка стран из шаблонника
import debounce from 'lodash.debounce';// импорт задержки срабатывания поиска (дебаунс)
import { error } from '@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js'; особая магия
import '@pnotify/core/dist/BrightTheme.css';
// 1. Сделать http-запрос
// 2. Получить и обработать ответ
// 3. Нарисовать интерфейс
const refs = getRefs();//ссылямбы мои)


refs.searchForm.addEventListener('input', debounce(getCountryInfo, 1000));//поставил задержку в 1 секунду
function getCountryInfo(e) {//полуяаем инфо про страну
    e.preventDefault();
    clearMarkup();
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery).then(renderCountryInfo).catch(handleFetchCountryError);// оьправляем запрос рендерим разметку если ок или пишем ошибку
}

function renderCountryInfo(country) {
  if (country.length === 1) {
      const markup = countryInformation(country);
      refs.articlesList.insertAdjacentHTML('beforeend', markup);   // рисуем то что нашли
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countriesList(country);
    refs.articlesList.insertAdjacentHTML('beforeend', markup);// рисуем то что нашли при больше 2 и меньше 10
  } else if (country.length > 10) {
    error({
      text: 'go clearly my friend',// уточняем
    });
  } else {
    clearMarkup();
    return;
  }
};

 function handleFetchCountryError() {
    console.log("Ops there is mistake!");
  }

function clearMarkup() {
  refs.articlesList.innerHTML = '';//чистим описание
}