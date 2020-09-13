export const BASE_URL = "http://54.254.62.41";

export const bannerImages = {
  sports: "/banners/banner.jpg",
  education: "/banners/banner.jpg",
  worklife: "/banners/banner.jpg",
  travel: "/banners/banner.jpg",
  future: "/banners/banner.jpg",
  culture: "/banners/banner.jpg",
  nepal: "/banners/banner.jpg",
  national: "/banners/banner.jpg",
  international: "/banners/banner.jpg",
  climate: "/banners/banner.jpg",
  health: "/banners/banner.jpg"
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