import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import StockPage from"./Pages/StockPage";
import Header from "./components/Header";
import LoginPage from "./LoginPage";

import { CryptoState } from "../src/CryptoContext";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  const { tablePage } = CryptoState();

  // Pages Navigation Setup
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={LoginPage} exact />
        <Route path="/home" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path="/stocks/:symbol" component={StockPage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
