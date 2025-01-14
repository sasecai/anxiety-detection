export const STATUS_GREEN = 'green';
export const STATUS_YELLOW = 'yellow';
export const STATUS_RED = 'red';
export const STATUS_NONE = 'none';

export const parseDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(' at ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };