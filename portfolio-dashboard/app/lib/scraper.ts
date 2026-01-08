import axios from 'axios';
import * as cheerio from 'cheerio';

export interface GoogleMetrics {
  pe: string;
  earnings: string;
}

export async function scrapeGoogleFinance(googleTicker: string): Promise<GoogleMetrics> {
  console.log(`[Google] Fetching: ${googleTicker}...`);

  try {
    const url = `https://www.google.com/finance/quote/${googleTicker}`;
    const { data } = await axios.get(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
      },
      timeout: 6000 
    });

    const $ = cheerio.load(data);
    
    const getMetric = (label: string) => {
      const labelDiv = $(`div:contains("${label}")`).last();
      
      if (!labelDiv.length) return "N/A";

      let value = labelDiv.parent().find('[class*="P6K39c"], [class*="YMlKec"]').text();

      if (!value) {
         value = labelDiv.next().text(); 
      }
      if (value.length > 20 || value.includes("ratio of")) {
         return "N/A";
      }
      console.log(`[Google] ${label} -> ${value}`);
      return value || "N/A";
    };
    console.log('pe==', getMetric("P/E ratio"));
    
    console.error(`[Google]  SUCCESS for ${googleTicker}`);

    return { 
      pe: getMetric("P/E ratio"), 
      earnings: getMetric("EPS (TTM)") !== "N/A" ? getMetric("EPS (TTM)") : getMetric("EPS")
    };
  } catch (error) {
    console.error(`[Google]  FAILED for ${googleTicker}: Timeout or Network Error`);
    return { pe: "N/A", earnings: "N/A" };
  }
}