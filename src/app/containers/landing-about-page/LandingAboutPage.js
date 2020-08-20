import React from "react";
import Footer from "../../components/footer/Footer";
import LandingTopNav from "../../components/landing-components/NavigationBar";

export default function LandingAboutPage() {
  return (
    <div
      className="LandingAboutPage"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <LandingTopNav currentPage="About" />
      <main
        style={{
          textAlign: "left",
          width: "75%",
          margin: "10px auto",
          flex: "1"
        }}
      >
        <h2>Brief history</h2>
        <p>
          Our company was formed in 2019, when we were unsatisfied with a
          competition we participated in college. Since then, we dedicated
          ourselves to serving all kinds of academic and professional
          competitions.
        </p>
        <h2>Our vision</h2>
        <p>
          In today's competitive world, contest is a great method to fairly
          select the best from the best. Sadly, the way these contests are
          hosted is very inefficient, tedious, and brings little satisfaction to
          participants, which can hurt the reputation of the organizers. We
          dedicate ourselves to helping these organizers run their competitions
          more efficiently, help them save money and time.
        </p>
        <p>
          Rivalry makes good friends. We also help participants feel like they
          are being respected and treated fairly during the contest. Our
          platform offers full transparency between organizers and participants,
          so they can get their questions answered, connect with key people, and
          make new friends in the process. We help make the contest they
          participate in the best place to apply their knowledge and skills, and
          get the best learning experience they can get. Satisfied participants
          are key to the organizers' reputation, and by offering the best
          experience to participants, we benefit the organizers as well.
        </p>
        <p>
          We are the pioneers in revolutionizing the way a contest is hosted.
          Kontess is the perfect place for your contests.
        </p>
      </main>
      <Footer />
    </div>
  );
}
