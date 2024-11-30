import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './slideshow.css';
// import { ads } from '../../../public/dummy_data/ads';

function SlideShow ( {ads} ) {
  // ads = ads.ads;
  console.log("Ads slideshow: ", ads);
  return (
        <div className="carousel-container position-relative">
          <Carousel
            prevIcon={<ChevronLeft className="carousel-control-icon" />}
            nextIcon={<ChevronRight className="carousel-control-icon" />}
            className="custom-carousel"
            interval={3000}
          >
            {ads.map((ad) => (
              <Carousel.Item key={ad.id}>
                <Row className="align-items-center content-container"
                    style={{
                        backgroundColor: `${ad.info.bg_color}`,
                    }}  
                >
                  <Col xs={12} md={6} className="order-md-1 order-2">
                    <div className="carousel-content p-4">
                      <h3 style={{color: `${ad.info.color}`}}
                      >{ad.info.heading}</h3>
                      <p
                        style={{
                            color: `${ad.info.color}`,
                            textAlign: 'justify',
                        }}
                        >{ad.info.description}</p>
                      {/* <button className="btn btn-primary">{ad.info.button}</button> */}
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="order-md-2 order-1 d-flex align-items-center justify-content-center">
                    <img
                      style={{width: '50%', height: '50%'}}
                      className="d-block"
                      src={ad.src}
                      alt={`Slide ${ad.id}`}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
    );
}

export default SlideShow;