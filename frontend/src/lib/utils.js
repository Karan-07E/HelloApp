export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getLocalDateKey(date) {
  const parsedDate = new Date(date);
  return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
}

export function formatMessageDate(date) {
  const parsedDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (getLocalDateKey(parsedDate) === getLocalDateKey(today)) return "Today";
  if (getLocalDateKey(parsedDate) === getLocalDateKey(yesterday)) return "Yesterday";

  return parsedDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: parsedDate.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
}
