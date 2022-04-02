import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { StockLogo } from "../config/api";
import { StockPrice } from "../config/api";
import { StockList} from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [stockName, setstockName] = useState();
  const [loaded, setLoaded] = useState(false);

  const { tablePage } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#0C5FDC",
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("USD"));
    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  const fetchStocks = async (symbol) => {
    setLoading(true);
    const { data } = await axios.get(StockPrice(symbol));
    
    axios.get(StockLogo(symbol))
    .then((response) => {
      data.url = response.data.url;
    })
    console.log(data);
    setStocks(prevArray => [...prevArray, data]);
    setLoading(false);
  };

  const fetchStockNames = async () => {
    setLoading(true);
    axios.get(StockList())
    .then((response) => {
      console.log(response.data);
      setstockName(response.data);
    });
    setLoading(false);
  }



  //Alle Stocks are fetched seperately, maybe a List can be implemented
  useEffect(() => {
    fetchCoins();
    if(loaded === false){
    //fetchStockNames();
    fetchStocks("IBM");
    fetchStocks("AMZN");
    fetchStocks("TSLA");
    fetchStocks("NVDA");
    fetchStocks("BNTX");
  }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePage]);

  const handleCoinSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const handleStockSearch = () => {
    return stocks.filter(
      (stock) =>
        stock.companyName.toLowerCase().includes(search) ||
        stock.symbol.toLowerCase().includes(search)
    );
  };

  if(tablePage === "COINS"){
    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Prices by Market Cap
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}  
            onChange={(e) => setSearch(e.target.value)}
            onInput={value => value.target.value = value.target.value.toLowerCase()} //toLowerCase() for optimal search
          />
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "#0C5FDC" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#2CC3DB" }}>
                  <TableRow>
                    {["Name", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Name" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {handleCoinSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => history.push(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas(row.current_price.toFixed(2))}
                          {" $"}
                            
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                            {" $"}
                            
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
  
          {/* Comes from @material-ui/lab */}
          <Pagination
            count={(handleCoinSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    );
  }

  if(tablePage === "STOCKS"){
    return (
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}>
            Stock List
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}  
            onChange={(e) => setSearch(e.target.value)}
            onInput={value => value.target.value = value.target.value.toLowerCase()} //toLowerCase() for optimal search
          />
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "#0C5FDC" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#2CC3DB" }}>
                  <TableRow>
                    {["Name", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Name" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {handleStockSearch().map(item => (                 
                  <TableRow
                          onClick={() => history.push(`/stocks/${item.symbol}`)}
                          className={classes.row}
                          key={item.symbol}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >                     
                          <img
                          src={item.url}
                          alt={item.symbol}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                            <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {item.symbol}
                              </span>
                              <span
                                style={{
                                  fontSize: 22,}}
                                >
                                {item.companyName}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {stocks.symbol} 
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {item.latestPrice} $
                          </TableCell>
                          <TableCell align="right">
                            {item.changePercent}%
                          </TableCell>
                          <TableCell align="right">
                            {item.marketCap} $
                          </TableCell>
                        </TableRow>))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
  
          {/* Comes from @material-ui/lab */}
          <Pagination
            count={(handleCoinSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    );
  }


  if(tablePage === "FOREX"){
    return(
      <div>FOREX LIST</div>

    );
  }



  
}
