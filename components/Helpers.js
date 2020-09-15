import dateFormat from "dateformat";

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

// Function to return the published date for a news item
export function getPublishedDate(publishedDate) {
  return dateFormat(publishedDate, "dd/mm/yyyy");
}

// Function to return the published time for a new item
export function getPublishedTime(publishedDate) {
  const createdDate = new Date(publishedDate);
  const currentDate = new Date();

  const timeDiff = currentDate - createdDate;
  let result;

  if (timeDiff < 60) {
    result = "Just now";
  } else if (timeDiff < 3600) {
    const minutes = Math.round(timeDiff / 60);
    result = minutes == 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else if (timeDiff < 3600 * 24) {
    const hours = Math.round(timeDiff / 3600);
    result = hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (timeDiff < 3600 * 24 * 2) {
    result = "Yesterday";
  } else {
    result = dateFormat(publishedDate, "longDate");
  }

  return result;
}

// Function to return todays date
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