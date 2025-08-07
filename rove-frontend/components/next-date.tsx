const today = new Date();

// Get one month from today
const inOneMonthDate = new Date(today);
inOneMonthDate.setMonth(today.getMonth() + 1);

// Get three days after the one-month date
const threeDaysAfter = new Date(inOneMonthDate);
threeDaysAfter.setDate(inOneMonthDate.getDate() + 3);

// Helper function to format a date as yyyy-mm-dd
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // months are 0-indexed
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const inOneMonth = formatDate(inOneMonthDate);
export const threeDaysLater = formatDate(threeDaysAfter);
