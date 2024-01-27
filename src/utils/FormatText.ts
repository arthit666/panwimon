export function formatPriceWithCommas(priceString: string) {
    const priceNumber = parseFloat(priceString); // Convert string to number
    if (isNaN(priceNumber)) {
      return ''; // Handle invalid input gracefully
    }
  
    return priceNumber.toLocaleString('en-US');
  }