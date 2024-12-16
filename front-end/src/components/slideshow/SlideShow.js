import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './slideshow.css';
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HighlightText } from "../custom_components/CustomIntroText";


function SlideShow ( {ads} ) {
  const navigate = useNavigate();
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
                        backgroundColor: "black",
                    }}  
                >
                  <Col xs={12} md={6} className="order-md-1 order-2">
                    <div className="carousel-content p-4">
                      <h3 style={{color: "white"}}
                      >{ad.course_name}</h3>
                      <p
                        style={{
                            color: "white",
                            textAlign: 'justify',
                        }}
                        >{ad.course_intro}</p>
                      <HighlightText
                        style={{fontSize: '1.5rem'}}
                        onClick={() => {
                          navigate(`/courseinfo?courseID=${ad.course_id}`);
                        }
                      }
                      >Study Now</HighlightText>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="order-md-2 order-1 d-flex align-items-center justify-content-center">
                    <img
                      style={{width: '50%', height: '50%'}}
                      className="d-block"
                      src={ad.image}
                      alt={`Slide ${ad.course_id}`}
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