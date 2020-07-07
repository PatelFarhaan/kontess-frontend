import React from 'react';
import Slider from "react-slick";
import{small_dots,user,comma_bottom} from '../../imagepath';

class Testimonials extends React.Component {
                 render() {
                   const settings = {
                     dots: false,
                     infinite: true,
                     speed: 300,
                     slidesToShow: 1,
                     slidesToScroll: 1,
                     adaptiveHeight: true,
                     arrows: true
                   };
                   return (
                     <section className="testimonial">
                       <div className="container">
                         <div className="section_heding">
                           <h2>Few Comment's for</h2>
                           <h3>Our Client's</h3>
                         </div>
                         <Slider className="testimonial_row" {...settings}>
                           <div className="testimonial_slide">
                             {/* <div className="testi_slide_left">
                               <img src={small_dots} />
                               <img className="profile_testi" src={user} />

                             

                             </div> */}
                               {/*====YOU CAN CHANGE IMAGE OF CUSTOMER======*/}
                             <div className="testi_slide_right">
                               <p>
                               Kontess did a great job of bringing all
                                of our competing teams to one platform and allowing participants to 
                                reach out to one another for collaboration and team building. We were 
                                also able to streamline the process of submitting concept papers and 
                                assigning them to judges for scoring.
                                 <img
                                   className="bottom_commos"
                                   src={comma_bottom}
                                 />
                               </p>
                               <div className="test_author">
                                 <h4>Breanna Hale</h4>
                                 <p>Program Co-ordinator of Beall Center of Innovation and Entrepreneurship </p>
                                 <p>University of California Irvine</p>
                               </div>
                             </div>
                           </div>

                           {/*============YOU CAN CREATE MORE TESTIOMONIAL FORM HERE.
                                        YOU HAVE TO COPY THE UPPER "testimonial_slide" DIV.
                           
                           ===========*/}
                          
                           
                         </Slider>
                       </div>
                     </section>
                   );
                 }
               }


export default Testimonials;