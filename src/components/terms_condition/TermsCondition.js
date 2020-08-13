import React from "react";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";

const TermsCondition = () => {
    return(
        <>
            <MainHeader innerHeader="inner_header"></MainHeader>
            <PagesBanner
            className="blog_banner"
            title="Terms and Condition"
            parentDir="Home"
            currentDir="Terms and condition"
            ></PagesBanner>
            <section className="csmt_accordian">
                <div className="container">
                <div
                    className="panel-group"
                    id="accordion"
                    role="tablist"
                    aria-multiselectable="true"
                >
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title">
                            <a
                            className="accordion-toggle"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </a>
                        </h4>
                    </div>
                    <div
                    id="collapseOne"
                    className="panel-collapse collapse in"
                    role="tabpanel"
                    aria-labelledby="headingOne"
                    >
                    <div className="panel-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
                        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
                        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
                        leo rutrum eu. Nullam egestas vehicula diam eu consequat. Etiam a erat
                        non turpis viverra rhoncus. In hac habitasse platea dictumst. Morbi
                        sollicitudin varius lobortis. Phasellus porttitor, libero non volutpat
                        finibus, mi odio tincidunt mi, eget placerat erat nisl id lectus. Nam
                        convallis, tortor vitae euismod fringilla, ante neque sodales purus, ut
                        bibendum sapien metus non tortor.
                    </div>
                    </div>
                </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingTwo">
      <h4 className="panel-title">
        <a
          className="accordion-toggle collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </h4>
    </div>
    <div
      id="collapseTwo"
      className="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingTwo"
    >
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
        leo rutrum eu. Nullam egestas vehicula diam eu consequat. Etiam a erat
        non turpis viverra rhoncus. In hac habitasse platea dictumst. Morbi
        sollicitudin varius lobortis.
      </div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingThree">
      <h4 className="panel-title">
        <a
          className="accordion-toggle collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </h4>
    </div>
    <div
      id="collapseThree"
      className="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingThree"
    >
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
        leo rutrum eu. Nullam egestas vehicula diam eu consequat.
      </div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingFour">
      <h4 className="panel-title">
        <a
          className="accordion-toggle collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseFour"
          aria-expanded="false"
          aria-controls="collapseFour"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </h4>
    </div>
    <div
      id="collapseFour"
      className="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingFour"
    >
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
        leo rutrum eu. Nullam egestas vehicula diam eu consequat.
      </div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingFive">
      <h4 className="panel-title">
        <a
          className="accordion-toggle collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseFive"
          aria-expanded="false"
          aria-controls="collapseFive"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </h4>
    </div>
    <div
      id="collapseFive"
      className="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingFive"
    >
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
        leo rutrum eu. Nullam egestas vehicula diam eu consequat.
      </div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingSix">
      <h4 className="panel-title">
        <a
          className="accordion-toggle collapsed"
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapseSix"
          aria-expanded="false"
          aria-controls="collapseSix"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </a>
      </h4>
    </div>
    <div
      id="collapseFive"
      className="panel-collapse collapse"
      role="tabpanel"
      aria-labelledby="headingSix"
    >
      <div className="panel-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
        ante in eleifend porta. Vestibulum tempus magna sed diam lacinia, sit
        amet tempor arcu volutpat. Vestibulum maximus mollis dolor, nec eleifend
        leo rutrum eu. Nullam egestas vehicula diam eu consequat.
      </div>
    </div>
  </div>
</div>;

                </div>
            </section>    
        </>
    );
}


export default TermsCondition;