export function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
  hours = String(hours).padStart(2, "0");

  return `${hours}:${minutes}  ${ampm}`;
}
export function getCurrentDayMonth() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[now.getMonth()];

  return `${day} ${month}`;
}
export function getCurrentYear() {
  return new Date().getFullYear();
}
