import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { numberWithCommas } from "../CoinsTable";
import { CryptoState } from "../../CryptoContext";
import { StockPrice } from "../../config/api";
import { StockLogo } from "../../config/api";

const Carousel = () => {
  const [stocks, setStocks] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { tablePage } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins("USD"));   //fetch trending coins from API

    console.log(data);
    setTrending(data);  //save received data
  };

  const fetchStocks = async (symbol) => {
    const { data } = await axios.get(StockPrice(symbol));

    axios.get(StockLogo(symbol))
    .then((response) => {
      data.url = response.data.url;
    })

    console.log(data);
    setStocks(prevArray => [...prevArray, data]); //append stocks array with new fetched stocks
  };

  useEffect(() => {
    fetchTrendingCoins();
    if(loaded === false){ //boolean loaded is used to control the fetching. Fetching should only take place once
      fetchStocks("IBM");
      fetchStocks("TSLA");
      fetchStocks("AMZN");
      fetchStocks("NVDA");
      setLoaded(true);    //after fetching 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePage]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  if(tablePage === "COINS"){  //if site is set to coins following code is executed
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
           {numberWithCommas(coin?.current_price.toFixed(2))} {"$"}
        </span>
      </Link>
    );
  });


  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items = {items}
        autoPlay
      />
    </div>
  );
}
if(tablePage === "STOCKS"){   //if site is set to stocks the following code is executed
  const items = stocks.map((coin) => {
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.url}
          alt={coin.symbol}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin.companyName}
          &nbsp;

        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {coin.symbol}
        </span>
        <span
            style={{
              fontWeight: 500,
            }}
          >
            {coin.changePercent}%
          </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel    //Component generates the rotating carousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}   
        autoPlay
      />
    </div>
  );
}
};

export default Carousel;
