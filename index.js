const cities = [
  "San Luis",
  "Misiones",
  "San Juan",
  "Entre Ríos",
  "Santa Cruz",
  "Río Negro",
  "Chubut",
  "Córdoba",
  "Mendoza",
  "La Rioja",
  "Catamarca",
  "La Pampa",
  "Santiago del Estero",
  "Santiago del Estero",
  "Corrientes",
  "Santa Fe",
  "Tucumán",
  "Neuquén",
  "Salta",
  "Chaco",
  "Formosa",
  "Jujuy",
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Tierra del Fuego",
];

let citySelected = encodeURI("San Luis");

const SELECTOR = document.querySelector("#selector"),
  DESCRIP = document.getElementById("descrip"),
  SPAN_TEMP = document.getElementById("span-temp"),
  SPAN_TERM = document.getElementById("span-term"),
  SPAN_MAX = document.getElementById("span-max"),
  SPAN_MIN = document.getElementById("span-min");

const setCity = () => {
  citySelected = encodeURI(SELECTOR.value);
  console.log(citySelected);
  refreshWidget();
};

SELECTOR.innerHTML = `${cities.map((city) => {
  return `<option class="city">${city}</option>`;
})}`;

const cityOptions = document.getElementsByClassName("city");
for (let c of cityOptions) {
  c.addEventListener("click", () => {
    setCity();
  });
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
    "X-RapidAPI-Key": "a034f7716fmshdab6d11165c8694p1af7d0jsn410d16d20406",
  },
};

const refreshWidget = () => {
  fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast?q=${citySelected}%2Car&lang=es&units=metric`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.list[0];
      const { main, weather } = data;
      const transformedDescrip =
        weather[0].description[0].toUpperCase() +
        Array.from(weather[0].description).slice(1).join("");

      DESCRIP.innerText = transformedDescrip;
      SPAN_TEMP.innerText = main.temp;
      SPAN_TERM.innerText = main.feels_like;
      SPAN_MAX.innerText = main.temp_max;
      SPAN_MIN.innerText = main.temp_min;
      console.log(main, weather);
    })
    .catch((err) => console.error(err));
};

document.onload = refreshWidget();
