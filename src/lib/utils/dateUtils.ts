// utils/dateUtils.ts

/**
 * Converts a date range string into a shorthand duration string.
 * 
 * @param {string} dateRange - The date range in the format "YYYY/MM - YYYY/MM".
 * @returns {string} - The duration in shorthand, e.g., "1y 11m".
 */
export function convertDateRangeToDuration(dateRange: string): string {
  // Validate input
  if (!dateRange || typeof dateRange !== 'string') {
    return 'Invalid date range.';
  }

  // Split the dateRange into start and end strings
  const [startStr, endStr] = dateRange.split(' - ').map(s => s.trim());

  // Helper function to parse "YYYY/MM" into a Date object
  const parseDate = (str: string): Date => {
    const [year, month] = str.split('/').map(Number);
    return new Date(year, month - 1); // Months are 0-indexed in JavaScript
  };

  // Parse start and end dates
  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);

  // Validate parsed dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return 'Invalid date format. Please use "YYYY/MM - YYYY/MM".';
  }

  // Ensure startDate is before or equal to endDate
  if (startDate > endDate) {
    return 'Start date must be before end date.';
  }

  // Calculate the difference in years and months
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  // Adjust years and months if months are negative
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Construct the shorthand duration string
  const durationParts: string[] = [];

  if (years > 0) {
    durationParts.push(`${years}y`);
  }

  if (months > 0) {
    durationParts.push(`${months}m`);
  }

  // Handle cases where duration is less than a month
  if (durationParts.length === 0) {
    return 'Less than a month';
  }

  // Join the parts with a space for readability
  return durationParts.join(' ');
}

/**
 * Formats a Date object into "YYYY/MM" string.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} - Formatted date string, e.g., "2023/08".
 */
export function formatDateToYYYYMM(date: Date): string {
  const year = date.getFullYear();
  // Months are zero-based in JavaScript Date objects. Add 1 and pad with leading zero if necessary.
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}/${month}`;
}


export function formatDateRange(rangeStr: string): string {
  const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if(!rangeStr) { return ''}

  const formatSingleDate = (dateStr: string): string => {
    const [year, month] = dateStr.trim().split('/');
    const monthIndex: number = parseInt(month, 10) - 1;

    if (monthIndex < 0 || monthIndex > 11 || isNaN(monthIndex)) {
      throw new Error(`Invalid month in date string: ${dateStr}`);
    }

    return `${year} ${months[monthIndex]}`;
  };

  const [start, end] = rangeStr.split('-');
  return `${formatSingleDate(start)} - ${formatSingleDate(end)}`;
}


export function getAge(birthDateStr: string): string {
  // Parse the birth date string
  const [year, month, day] = birthDateStr.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
  
  // Get current date
  const today = new Date();
  
  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return `${age}`;
}

