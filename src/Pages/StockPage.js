import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { StockPrice } from "../config/api";
import { StockLogo } from "../config/api";
import { StockCompany } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";

const StockPage = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState();
  const [stockImage, setStockImage] = useState();
  const [stockInfo, setStockInfo] = useState();


  const fetchStock = async () => {
    const { data } = await axios.get(StockPrice(symbol));
    setStock(data);
    console.log(data);
    axios.get(StockLogo(symbol))
    .then((response) => {
      console.log(response.data.url);
      setStockImage(response.data.url);
    })
    axios.get(StockCompany(symbol))
    .then((response) => {
      console.log(response.data.description);
      setStockInfo(response.data.description);
    })
  };

  useEffect(() => {
    console.log("StockPage");
    fetchStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!stock) return <LinearProgress style={{ backgroundColor: "#0C5FDC" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={stockImage}
          alt={stock.symbol}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {stock.symbol}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {stockInfo}
        </Typography>
        <div className={classes.marketData}>


          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {stock.latestPrice}$
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {stock.marketCap}
              {" $"}
              
            </Typography>
          </span>
        </div>
      </div>

    </div>
  );
};

export default StockPage;
