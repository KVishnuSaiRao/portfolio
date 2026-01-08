import { GoogleMetrics } from './scraper';

export function processStockCalculations(stock: any, yahooData: any, googleData: GoogleMetrics) {
    let cmp = 0; 
  if (yahooData && typeof yahooData.regularMarketPrice === 'number') {
    console.log('yahooData===',yahooData);
    
    cmp = yahooData.regularMarketPrice;
  }

  let pe = "N/A";
  if (googleData.pe && googleData.pe !== "N/A") {
    pe = googleData.pe; 
  } else if (yahooData && yahooData.trailingPE) {
    pe = yahooData.trailingPE.toFixed(2); 
  }

  let earnings = "N/A";
  if (googleData.earnings && googleData.earnings !== "N/A") {
    earnings = googleData.earnings;
  } else if (yahooData && yahooData.epsTrailingTwelveMonths) {
    earnings = yahooData.epsTrailingTwelveMonths.toFixed(2); 
  }

  const investment = stock.buyPrice * stock.qty;

  const presentValue = cmp * stock.qty; 
  
  const gainLoss = presentValue - investment;
  const gainLossPercent = investment > 0 ? (gainLoss / investment) * 100 : 0;
  
  const exchangeCode = stock.ticker.includes('.BO') ? 'BSE' : 'NSE';

  return {
    id: stock.id,
    name: stock.name,
    ticker: stock.ticker,
    sector: stock.sector,
    exchangeCode, 
    buyPrice: stock.buyPrice,
    qty: stock.qty,
    cmp,               
    investment,
    presentValue,      
    gainLoss,          
    gainLossPercent,
    pe,                
    earnings,         
  };
}