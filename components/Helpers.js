export const BASE_URL = "http://54.254.62.41";
export const WEATHER_API_KEY = "755449ef75734ac0bc634701203107";

export const bannerImages = {
  default: "/banners/banner.jpg",
  sports: "",
  education: "",
  worklife: "",
  travel: "",
  future: "",
  culture: "",
  nepal: "",
  national: "",
  international: "",
  climate: "",
  health: ""
}

export function getPublishedDate(publishedDate) {
  const year = publishedDate.substring(0, 4);
  const month = publishedDate.substring(5, 7);
  const day = publishedDate.substring(8, 10);
  return day + "/" + month + "/" + year;
}

export function getTodaysDate(monthFormat="2-digit", longDate=false) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = today.toLocaleString('default', { month: monthFormat });
  const yyyy = String(today.getFullYear());
  let result;
  if (longDate) {
    result = dd + " " + mm + " " + yyyy + ', ' + today.toLocaleString('en-us', { weekday: 'long' });
  } else {
    result = yyyy + "-" + mm + "-" + dd;
  }
  return result;
}