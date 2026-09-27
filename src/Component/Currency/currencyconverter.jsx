export const AVAILABLE_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'NPR', 'AUD', 'CAD', 'JPY'];

// Replace with your free key from https://www.exchangerate-api.com/
const API_KEY = '048df42123a748547b9a1c4b'; 

export async function fetchExchangeRates() {
  try {
    // This endpoint natively supports 160+ world currencies including NPR and INR
    const res = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    const response = await fetch(res);
    const data = await response.json();

    if (data.result === 'success') {
      console.log("Live Global Rates Fetched:", data.conversion_rates);
      return data.conversion_rates; // Returns live rates for all currencies natively
    } else {
      throw new Error("API response unsuccessful");
    }
  } catch (err) {
    console.error("Failed to fetch from global exchange API:", err);
    return { USD: 1 };
  }
}