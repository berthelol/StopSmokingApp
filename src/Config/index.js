export const Config = {
  //API_URL: 'https://smokingstop.herokuapp.com/',
  //API_URL:'http://localhost:3000/',
  API_URL:'http://77.201.202.226/',
  monthNames: [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ],
  lifetimePerCigarette:11,
  package_price_default:6.5,
  minute_separator:90
};

export const format_time = (time) => {
  hours = Math.floor(time / 3600);
  hours = hours < 10
    ? "0" + hours
    : hours;
  time %= 3600;
  minutes = Math.floor(time / 60);
  minutes = minutes < 10
    ? "0" + minutes
    : minutes;
  return hours + "h" + minutes;
}
