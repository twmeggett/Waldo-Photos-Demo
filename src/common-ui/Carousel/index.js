import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.less';

class CarouselWrapper extends React.Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      body: PropTypes.node,
    })).isRequired,
    showThumbs: PropTypes.bool,
    infiniteLoop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    showArrows: PropTypes.bool,
    showIndicators: PropTypes.bool,
    interval: PropTypes.number,
    transitionTime: PropTypes.number,
  }

  render() {
    return (
      <section id="carousel">
        <Carousel emulateTouch
          showThumbs={this.props.showThumbs}
          infiniteLoop={this.props.infiniteLoop}
          autoPlay={this.props.autoPlay}
          showArrows={this.props.showArrows}
          showIndicators={this.props.showIndicators}
          interval={this.props.interval}
          transitionTime={this.props.transitionTime}>
          {
            this.props.slides.map((slide, index) => {
              return (
                <div key={'carousel_slide' + index}>
                  <div className="row">
                    <div className="main-img">
                      <img src={slide.img} />
                    </div>
                    <div className="sub-text">
                      {slide.body}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </Carousel>
      </section>
    );
  }
}

export default CarouselWrapper;
