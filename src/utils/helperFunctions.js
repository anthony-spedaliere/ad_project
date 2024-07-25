// Format date to MM/DD/YYYY
export const formatDate = (dateString) => {
  const date = new Date(dateString + "T00:00:00"); // Append 'T00:00:00' to ensure it's interpreted as local time
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(undefined, options);
};

// Format time to HH:MM PM/AM
export const formatTime = (timeString) => {
  const [time] = timeString.split("-");
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(parseInt(seconds));
  let formattedTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return formattedTime;
};

// Convert seconds to minutes
export const formatMinutes = (seconds) => (seconds / 60).toFixed(1);

// Capitalize first letter
export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
