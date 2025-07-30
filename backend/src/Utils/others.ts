export const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));

export const getFormattedTodayDate = (): string => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
};
