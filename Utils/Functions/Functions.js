export function getParsedCurrentDateTime() {
  const currentTime = new Date();

  const day = currentTime.getDate().toString().padStart(2, "0");
  const moth = (currentTime.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses empiezan en 0
  const year = currentTime.getFullYear();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  const parsedDateTime = `${day}/${moth}/${year} ${hours}:${minutes}:${seconds}`;

  return parsedDateTime;
}
