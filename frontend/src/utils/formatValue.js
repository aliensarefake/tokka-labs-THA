export const formatValue = (num, dp = 2) => {
  if (num === null || num === undefined || isNaN(num)) {
    return 'N/A'; 
  }

  const absNum = Math.abs(num);
  let formattedValue;
  let suffix = '';

  if (absNum >= 1e12) {
    formattedValue = num / 1e12;
    suffix = 'T'; 
  } else if (absNum >= 1e9) {
    formattedValue = num / 1e9;
    suffix = 'B'; 
  } else if (absNum >= 1e6) {
    formattedValue = num / 1e6;
    suffix = 'M'; 
  } else if (absNum >= 1e3) {
    formattedValue = num / 1e3;
    suffix = 'K';
  } else {
    formattedValue = num;
  }

  formattedValue = parseFloat(formattedValue).toFixed(dp);

  return formattedValue + suffix;
};
