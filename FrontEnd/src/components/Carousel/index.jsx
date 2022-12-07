import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import styles from "./styles.module.scss";
import "pure-react-carousel/dist/react-carousel.es.css";

const Carousel = ({ children, height, width }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={80}
      naturalSlideHeight={35}
      totalSlides={React.Children.count(children)}
      className={styles.carousel}
      infinite
    >
      <Slider className={styles.slider}>
        {React.Children.map(children, (child, index) => {
          return (
            <Slide index={index} key={index}>
              {React.cloneElement(child, {
                className: styles.imgSlide,
                style: { ...child.props.style },
              })}
            </Slide>
          );
        })}
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
