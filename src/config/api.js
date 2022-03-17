export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const StockList = () =>
  `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;

export const StockPrice = (symbol) =>
  `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;

export const StockChart = (symbol, days = 365) =>
  `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${days}d?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;

export const StockLogo = (symbol) =>
  `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;

export const StockCompany = (symbol) =>
  `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;

export const StockStats = (symbol) =>
  `https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=pk_d95aa31868b74f6db51b05ecc5376ce5`;




