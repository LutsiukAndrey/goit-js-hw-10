export { createMurkup, createMurkupMin };
const createMurkup = data => {
  return data
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<h1><img src="${flags.png}" alt="${
          name.official
        }" width="40" height="40">${name.official}</h1>
        <ul style="list-style: none; padding-left: 0">
          <li>Capital:${capital}</li>
          <li>Population:${population}</li>
          <li>Languages:${Object.values(languages)}</li>
        </ul>`
    )
    .join('');
};
const createMurkupMin = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<h1><img src="${flags.png}" alt="${name.official}" width="40" height="40">${name.official}</h1>`
    )
    .join('');
};
