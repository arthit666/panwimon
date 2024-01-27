export function getCurrentDateTimeFormatted(isDay: boolean = false) {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = currentDate.getFullYear();

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  if (isDay) return `${day}/${month}/${year}`;

  return `${hours}:${minutes}:${seconds}`;
}
