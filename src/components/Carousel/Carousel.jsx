import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "./ExampleCarouselImage";
import firstImage from '../../images/main1.png';
import secondImage from '../../images/main2.jpg';
import thirdImage from '../../images/main3.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Carousel.css";

function UncontrolledExample() {
  const [isScreenWide, setIsScreenWide] = useState(window.innerWidth >= 768);

  // Update the state when the screen is resized
  useEffect(() => {
    const handleResize = () => {
      setIsScreenWide(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isScreenWide) {
    return null; // Hide the carousel if the screen width is less than 768px
  }

  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage imageSrc={firstImage} altText="First slide" />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage imageSrc={secondImage} altText="Second slide" />
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage imageSrc={thirdImage} altText="Third slide" />
        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
