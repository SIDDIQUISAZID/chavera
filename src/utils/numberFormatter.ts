const locales = "en-US";
export const numberFormat = Intl.NumberFormat(locales, { notation: "compact" });
export const commaFormat = Intl.NumberFormat(locales);

export function ordinalSuffix(num: number): string {
  var j = num % 10,
    k = num % 100;
  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }
  return num + "th";
}

export function formatUSPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters from the input
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format the US phone number as +1 (XXX) XXX-XXXX
  const countryCode = '+1';
  const areaCode = cleaned.substring(0, 3);
  const firstPart = cleaned.substring(3, 6);
  const secondPart = cleaned.substring(6);

  const formattedNumber = `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
  return formattedNumber;
}

export function formatIndianPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters from the input
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length === 10) {
    // Format Indian phone number as +91 XX XXXX XXXX
    const countryCode = '+91';
    const areaCode = cleaned.substring(0, 2);
    const firstPart = cleaned.substring(2, 6);
    const secondPart = cleaned.substring(6);

    const formattedNumber = `${countryCode} ${areaCode} ${firstPart} ${secondPart}`;
    return formattedNumber;
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    // Convert Indian number with leading '0' to international format
    const withoutZero = cleaned.substring(1);
    return formatIndianPhoneNumber(`+91${withoutZero}`);
  }

  return 'Invalid Indian phone number';
}
