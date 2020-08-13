import React from 'react';
import Slider from "react-slick";
import{wood,pico,carlosn,sponsor1,sponsor2,sponsor3} from '../../imagepath';

class SponsorsSlider extends React.Component {
                 render() {
                   const settings = {
                    dots: false,
                    arrows:true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 767,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
        
                      ]
                   };
                   return (
                     <section className="awards_section notable_sponsor">
                       <div className="container">
                         <div className="pri_head">
                            <h2 class="pri_head ">
                                Notable <span> sponsors</span>
                            </h2>
                         </div>
                         <Slider className="notable_wrap" {...settings}>
                            <div className="awards_img_col">
                                <img src={sponsor1} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor2} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor3} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor1} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor2} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor3} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor1} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor2} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor3} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor1} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor2} alt='' />
                            </div>
                            <div className="awards_img_col">
                                <img src={sponsor3} alt='' />
                            </div>
                           
                         </Slider>
                       </div>
                     </section>
                   );
                 }
               }


export default SponsorsSlider;