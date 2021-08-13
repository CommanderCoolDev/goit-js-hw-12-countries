
'use strict';// строгий ДЖС)))

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  return fetch(baseUrl + `${searchQuery}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(console.error());
  });
} // функция фетча.почти шаблон с мдн

export default { fetchCountries };
