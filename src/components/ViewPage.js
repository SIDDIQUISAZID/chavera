
import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/viewpage.css";

const ViewPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => <div className="custom-dot"></div>,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <Container
      fluid
      className={`carousel-container ${
        currentSlide === 2 ? "third-slide" : ""
      }`}
    >
      <Col xs={12} md={12} className="carousel-col">
        <Slider {...sliderSettings} style={{ width: "100%" }}>
          <div className="d-block w-100 first-slide">
            <h1 className="carousel-title">Network KPI Monitoring Tool</h1>
            <img src="/img/Dish_logo.png" alt="Logo" className="carousel-logo" />
            <p className="carousel-description">
              Continuous 24/7 signal monitoring ensures <br />
              a robust and reliable communication network around the clock
            </p>
          </div>
          <div className="card-container" style={{marginBottom:'117px'}}>
            <div className="view-card">
              {/* <img src="/path/to/icon1.png" alt="Icon 1" />
              <h2>Card 1 Title</h2>
              <p>Card 1 Content</p>
              <a href="/learn-more-2" className="learn-more-button">Learn More</a> */}
            </div>
            <div className="view-card">
              {/* <img src="/path/to/icon2.png" alt="Icon 2" />
              <h2>Card 2 Title</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              </p>
              <a href="/learn-more-2" className="learn-more-button">Learn More</a> */}
            </div>
            <div className="view-card">
              {/* <img src="/path/to/icon3.png" alt="Icon 3" />
              <h2>Card 3 Title</h2>
              <p>Card 3 Content</p>
              
              <a href="/learn-more-2" className="learn-more-button">Learn More</a> */}
            </div>
          </div>
          <div className="third-slide">
            {/* <img src="img/third-slide.gif" alt="Gif Background" /> */}
          </div>
        </Slider>
      </Col>
    </Container>
  );
};

export default ViewPage;
