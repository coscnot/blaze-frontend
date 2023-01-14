import React from 'react';
import tce from '../../images/events/tce.png'
import ks from '../../images/events/ks.jpeg'
import nss from '../../images/events/nss.jpeg'

import InfiniteCarousel from 'react-leaf-carousel';

function SubCarousel(){
    return (
        <InfiniteCarousel 
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={true}
        // paging={true}
        lazyLoad={true}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesSpacing={1}
        pauseOnHover={true}
        slidesToScroll={1}
        slidesToShow={4}
        scrollOnDevice={true}
      >
        <div>
          <img
            alt=""
            src={tce}
          />
        </div>
        <div>
          <img
            alt=""
            src={ks}
          />
        </div>
        <div>
          <img
            alt=""
            src={nss}
          />
        </div>
        <div>
          <img
            alt=""
            src={tce}
          />
        </div>
        <div>
          <img
            alt=""
            src={ks}
          />
        </div>
        <div>
          <img
            alt=""
            src={nss}
          />
        </div>
           
      </InfiniteCarousel>
    );
}

export default SubCarousel;