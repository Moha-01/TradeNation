import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner3.gif)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%"

}}));



function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
              <img src="http://drive.google.com/uc?export=view&id=1JaWG_Q7V1kRHEMzrmK3vmTHbeTz2_So5" alt="TradeNation" />
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
