import React from "react";
import {blog_listing} from "../../imagepath";
import {brook_cagle} from "../../imagepath";
import {mobile_app} from "../../imagepath";
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";

const BlogSingle = () => {
  return (

      <div>
      <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <title>How to improve participant experience while social distancing | Kontess</title>
        <meta name="description" content="As a competition organizer, your goal is to ensure participants' 
        have a positive experience throughout the competition. Kontess is the ultimate platform for running virtual competitions. We believe the only 
        way to give participants the best experience is to show them that you care. All of our features, in addition to the basic competition management 
        tools, are focused on improving participants’ experience. At Kontess, we understand your pain and your desire, so we dedicate ourselves to helping competition 
        organizers like you to overcome the challenges we all face at these times, so your competition can continue to grow to larger scales. " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
        <h4>
          <a href="/blog">BACK TO BLOG</a>
        </h4>
        <ul className="posted">
          <li>
            POSTED BY
            
             <a href="https://www.linkedin.com/in/kevin-phong-wong-9a0239123/" class="blue_color"> KEVIN WONG</a>
            
          </li>
          <li>17 JULY 2020</li>
          <li>
            <a href>WHY KONTESS, PARTICIPANT EXPERIENCE</a>
          </li>
        </ul>
        <div className="blog_pic">
          <img src={blog_listing} />
        </div>
        <h2 class="text-center">How to improve participant experience while social distancing</h2>
        <br /><br />
        <p>
          Nowadays, departments across universities organize competitions among students as a chance for 
          them to apply what they learn in class to real life situations and strive to be the best among 
          their peers. At the end of the competition, winners are publicly announced as a way of showcasing 
          the achievements students can potentially achieve in their university. This can in turn boost the 
          reputation of the university, allowing more access to sponsorships and donations, and that is the 
          ultimate goal of most competition organizers.
        </p>
        <p>
          Selecting the winners from a pool of qualified participants is no easy task. In order for winners to 
          emerge at the end, participants will have completed many hours of workshop, training, team work, and 
          networking to meet the requirements of the competitions. As a result, participants will feel very stressful 
          throughout the competition. After all, it is very heartbreaking if all the hard work they put in does not yield a 
          satisfactory result at the end.
        </p>
        <p>
          In addition, for the participants who are mostly students, the competition is a hands-on learning opportunity for 
          them, so they will want to feel like they have learned something valuable from their experience in the 
          competition. For this reason, the competition organizer’s job is not only about managing the internal operations 
          or organizing events throughout the competition, but also about <b>offering a positive experience among 
          participants.</b>
        </p>
        <div className="blog_pic">
        <img src={brook_cagle} />
        </div>
        <cite><span>Photo by <a href="https://unsplash.com/@brookecagle?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Brooke Cagle</a></span></cite>
        <br /><br />
        <p>For organizers who have experience in event management, they would view the natural way of offering a 
        positive experience will be hosting events that are entertaining and educational. Inviting guest speakers to a 
        workshop, asking them to crack some jokes while teaching the attendees knowledge, tips and tricks on the topic would 
        be the way to go. <i>That method is effective, but it is not enough.</i></p>
        <p>The reason is that most academic competitions do not consist of only one event, but a series of events that is almost 
        similar to a journey. The guest speaker can provide something interesting to the participants in one workshop, but that would 
        create a sense of misconception among the participants: that the only times they like about the competition are during workshops. 
        And of course during the award ceremony, but that only applies to the winners.</p>
        <br />
        <b><blockquote><i>As a competition organizer, your goal is to ensure participants' have a positive experience throughout the competition.</i></blockquote></b>
        <br />
        <p>By making sure participants’ experience is high, you show them that you care about their success at the competition, and you will guide 
        them through the difficulty they feel stressed about. Looking back at the competition, even if they don’t win, participants will remember both 
        the good and stressful times, and how the friendly staff and organizers have helped them weathered through what could possibly be the most memorable 
        moments of their lives.</p>
        <p>When participants are satisfied, they will in turn help you promote your competition through word-of-mouth, a more 
        powerful marketing tool than any forms of advertisement. Eventually, more participants within your department, outside of your 
        department, or even outside of your school, will want to participate in your competition. Combining with showcasing winners at the end, 
        you manage to boost the reputation of your university by many times.</p>
        <p>However, in this unprecedented time, most academic activities, including academic competitions, 
        have to move virtual. Such transition ends up making it increasingly difficult to offer participants 
        the same experience when direct interaction with one another is no longer possible. More than ever, there needs 
        to be a solution that can sustain the same level of positive experience among participants, 
        even when everything is virtual. <b>And this is where we can help.</b></p>
        <br />
        <div className="blog_pic">
        <img src={mobile_app} />
        </div>
        <br />
        <br />
        <p>Kontess is the ultimate platform for running virtual competitions. We believe the only 
        way to give participants the best experience is to show them that you care, so that they 
        feel respected, just like how you remember being respected by the Starbucks employee when you 
        order coffee from them. All of our features, in addition to the basic competition management 
        tools, are focused on improving participants’ experience. </p>
        <br />
        <p><h3>Create open communication with full transparency to every participant</h3></p>
        <br />
        <p>Most often, participants’ experience is worsened when they do not understand what’s going on 
        in the competition, where they are, and what they are supposed to do. To avoid that, you usually 
        send many reminder emails of important announcements, upcoming events or tasks soon due. Because of 
        social distancing, communication is mostly only emails, but unfortunately, it is not open and transparent 
        enough.</p>
        <p>Sending bulk emails can potentially create many administrative problems. Many times, you 
        will be bombarded by emails from participants asking for clarifications on a certain point in an 
        announcement you just posted, or asking to extend the deadline of a submission because of various reasons. 
        Having to open and reply to individual email, you will quickly get exhausted and can easily make mistakes, 
        such as accidentally ignoring an email.</p>
        <p>Kontess offers direct messaging functionality for addressing any individual question or concern, 
        so instead of seeing your inbox full, you only receive direct messages, and can easily sort them through. 
        In addition, our announcement and event organizing system can replace the bulk emails you have to send out 
        as announcements every time.</p>
        <br />
        <p><h3>Providing sufficient resources for participants</h3></p>
        <br />
        <p>Most resources are provided during and after workshops with an educator or guest speakers. For most 
        participants, these sessions are valuable lessons, but during the current period of social distancing, the 
        workshops no longer feel the same. Moreover, virtual events are more difficult to manage and promote, because 
        having to send out a Zoom link to everyone is no fun, and people might lose the link and cannot participate.</p>
        <br />
        <b><blockquote><i>Our event scheduling feature is integrated with Zoom, so you only need to set the time and date 
        and all participants will receive notification and a link to the event.</i></blockquote></b>
        <br />
        <p>At the end of the event, be sure to send out the powerpoint slides used, and if possible, the recording of the event, 
        so that participants who can’t attend can also have access to the information. You can post these information to your 
        own website, or simply attach them to our announcement system.</p>
        <br />
        <p><h3>Provide opportunities for participants to connect and work together</h3></p>
        <br />
        <p>Typically, events and workshops are the best moments for participants to network with one another. Unfortunately, 
        this is no longer possible, and participants’ experience can quickly deteriorate without such opportunities. Virtual 
        conferences offer very little openings for participants to meet and talk.</p>
        <p>Kontess offers two key features that allow participants to connect remotely. The “Team” feature allows participants 
        to quickly form teams with the right expertise, so they can get to work on the required tasks together and learn from each 
        other. Within each team, there is also a collaborative workspace that functions similarly to Slack and Google Drive, giving 
        participants the same experience as working together in real life. The Direct Message feature, similar to the one administrator 
        uses, also allows all participants to chat and connect with one another at any time.</p>
        <p>As a competition organizer, your goal is to improve participants’ experience, so participants can look back and feel satisfied 
        about the time and hard work they spent at your competition. This in turn can improve future participation rate and boost the 
        reputation of your organization, opening you to more opportunities for sponsorships and donations.</p>
        <p>However, hosting academic competitions has become difficult in recent times, and maintaining the same positive experience among 
        participants is even more difficult. At Kontess, we understand your pain and your desire, so we dedicate ourselves to helping competition 
        organizers like you to overcome the challenges we all face at these times, so your competition can continue to grow to larger scales. Read 
        more about how we can help <a href="/solutions">here</a>!</p>












      </div>
  );
};

export default BlogSingle;
