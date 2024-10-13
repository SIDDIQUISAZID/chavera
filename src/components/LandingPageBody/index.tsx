import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
  } from "@mui/material";
  import EastIcon from "@mui/icons-material/East";


import { Explore_our, Network_KPI_Monitoring_Tool } from "../../utils/commonTextFile";


function index({props}:any) {

    const cardsData = [
        {
          title: "Device and App Testing Automation",
          description:
            "Streamline your development process with device and app testing automation for faster, more reliable results.",
          backgroundImage: 'url("/img/card1.png")',
        },
        {
          title: "Remote & Centralized Monitoring Dashboard",
          description:
            "Continuous 24/7 signal monitoring ensures a robust and reliable communication network around the clock.",
          backgroundImage: 'url("/img/card2.png")',
        },
        {
          title: "Logs & Report",
          description:
            "Logs provide detailed event records, while reports offer summarized insights, both vital for monitoring and optimizing software systems",
          backgroundImage: 'url("/img/card3.png")',
        },
        {
          title: "Configurable Framework",
          description:
            "A configurable framework adapts seamlessly to diverse requirements, empowering users to tailor functionality to their specific needs",
          backgroundImage: 'url("/img/card4.png")',
        },
      ];
  return (
    <div className="mx-14">
      <div
          className={"text-4xl  textAlign:'left' my-5"}
        >
          {Explore_our} <strong className="text-4xl">{Network_KPI_Monitoring_Tool}</strong>
        </div>
        <Grid container spacing={2} justifyContent="space-between">
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex' }}>
          <Card
            sx={{
              position: "relative",
              width: "100%",
              background: card.backgroundImage,
              backgroundSize: "cover",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: "hidden",
              borderRadius: "10px",
              transition: "opacity 0.2s ease-in-out",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                background: `linear-gradient(to bottom, #334c9d 0%, #912bc4 51%, #dd1c4c 100%)`,
                borderRadius: "10px",
                opacity: 0.8,
              },
            }}
          >
            <CardContent
              sx={{
                color: "white",
                paddingTop: "231px",
                position: "relative",
                zIndex: 2,
                height: "26%",
              }}
            >
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'left', marginBottom: 2 }}>
              <Button
                variant="contained"
                endIcon={<EastIcon />}
                sx={{
                  background: "#EC1944",
                  borderRadius: "22px",
                  textTransform: "none",
                  color: "white",
                  zIndex: 1,
                  "&:hover": {
                    background: "white",
                    color: "#EC1944",
                  },
                }}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

index.propTypes = {

}

export default index

