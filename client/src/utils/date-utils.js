export const convertDateToDayEntryKey = date => {
  const parsedDate = new Date(date);
  const monthIndex = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${year}/${monthIndex}/${day}`;
};

const getFormattedHour = hour => {
  if (hour === 0) {
    return '12';
  } else if (hour > 12) {
    return `${hour - 12}`;
  } else {
    return `${hour}`;
  }
};

export const getTimeFromDate = date => {
  const time = new Date(date);
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = getFormattedHour(hour);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHour}:${formattedMinutes} ${suffix}`;
};
