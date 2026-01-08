import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { holdings } from "@/app/lib/data";
import { scrapeGoogleFinance } from "@/app/lib/scraper";
import { processStockCalculations } from "@/app/lib/utils";

const yahooFinance = new YahooFinance();

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("=== API START: Fetching Portfolio ===");

  try {
    const promises = holdings.map(async (stock) => {
      let yahooData: any = null;
      try {
        console.log(`[Yahoo] Requesting ${stock.ticker}...`);

        yahooData = await yahooFinance.quote(stock.ticker);
        console.error(`[Yahoo] Success for ${stock.ticker}:`);
      } catch (err) {
        console.error(
          `[Yahoo] CRASH for ${stock.ticker}:`,
          err instanceof Error ? err.message : err
        );
      }

      const googleData = await scrapeGoogleFinance(stock.googleTicker);

      return processStockCalculations(stock, yahooData, googleData);
    });

    const rawData = await Promise.all(promises);

    const totalPortfolioValue = rawData.reduce(
      (sum, item) => sum + item.presentValue,
      0
    );
    const finalData = rawData.map((item) => ({
      ...item,
      portfolioWeight:
        totalPortfolioValue > 0
          ? ((item.presentValue / totalPortfolioValue) * 100).toFixed(2)
          : "0",
    }));

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
