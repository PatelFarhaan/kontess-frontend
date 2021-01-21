
import React from "react";
import JudgePlateformPage from "./linkPages";

const color_heading = [
  '#eb6896',
  '#1991eb',
  '#7e72f2',
  '#06ef60',
  '#ff5733'
]
export default class JudgePlateform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTab: 2,
      headerSubTab: 1
    };
  }
  handleTabs = (name, index) => {
    this.setState({ [name]: index })
  }
  render() {
    const { headerTab, headerSubTab } = this.state
    return (
      <div className="judge_container">
        <div className="color_bar"></div>
        <div className="tab_bar">
          <div className={headerTab === 1 ? "tabs active" : "tabs"} onClick={() => this.handleTabs('headerTab', 1)}>Score tab</div>
          <div className={headerTab === 2 ? "tabs active" : "tabs"} onClick={() => this.handleTabs('headerTab', 2)}>Tracks</div>
        </div>
        {headerTab === 1 &&
          <div className="tracks_contant">
            <div className="tab_bar sub_tab_bar">
              <div className={headerSubTab === 1 ? "tabs sub_active" : "tabs "} onClick={() => this.handleTabs('headerSubTab', 1)}>Consumer Products</div>
              <div className={headerSubTab === 2 ? "tabs sub_active" : "tabs"} onClick={() => this.handleTabs('headerSubTab', 2)}>Consumer Services</div>
              <div className={headerSubTab === 3 ? "tabs sub_active" : "tabs"} onClick={() => this.handleTabs('headerSubTab', 3)}>Business Products/Services</div>
              <div className={headerSubTab === 4 ? "tabs sub_active" : "tabs"} onClick={() => this.handleTabs('headerSubTab', 4)}>Life Science</div>
              <div className={headerSubTab === 5 ? "tabs sub_active" : "tabs"} onClick={() => this.handleTabs('headerSubTab', 5)}>Socical Enterprise</div>
            </div>
          </div>
        }
        {headerTab === 3 && <JudgePlateformPage id={1} score={73} />}
        <div className="main_container">
          {headerTab === 1 &&
            <div className="tracks_contant">
              <div className="card">
                <h1 style={{ color: color_heading[headerSubTab - 1] }}>{" "}</h1>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
                <div className='details'>
                  <div className="team_name"><h2>Team</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>90</span></h4>
                    <span>View teams...</span>
                  </div>
                  <div className='action_area'>
                    <div className="btn_area">
                      <div className='view_details_btn'>
                        Export
                            </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {headerTab === 2 &&
            <div className="tracks_contant">
              <div className="tracks_card" style={{ background: '#eb6896' }}>
                <h1>Consumer Products</h1>
                <span>View teams...</span>
              </div>
              <div className="tracks_card" style={{ background: '#1991eb' }}>
                <h1>Consumer Services</h1>
                <span>View teams...</span>
              </div>
              <div className="tracks_card" style={{ background: '#7e72f2' }}>
                <h2>Business Products/Services</h2>
                <span>View teams...</span>
              </div>
              <div className="tracks_card" style={{ background: '#06ef60' }}>
                <h1>Life Science</h1>
                <span>View teams...</span>
              </div>
              <div className="tracks_card" style={{ background: '#ff5733' }}>
                <h1>Socical Enterprise</h1>
                <span>View teams...</span>
              </div>
              <div className="tracks_card" >
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
