

import React from "react";
const color_heading = [
  'gold',
  'silver',
  '#cd7f32'
]
export default class JudgePlateformPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTab: 1,
      headerSubTab: 1
    };
  }
  handleTabs = (name, index) => {
    this.setState({ [name]: index })
  }
  render() {
    return (
      <div className="judge_container">
        <div className="main_container">
          <div className="page">
            <h1>{this.props.title}</h1>
            <div className="products">
              {
                Array.from(Array(10), (a, index) => (<div className='details' style={{ background: color_heading[index] }}>
                  <div className="team_name"><h2>Team {index + 1}</h2></div>
                  <div className="team_score">
                    <h4>Score : <span>{this.props.score}</span></h4>
                  </div>
                </div>
                )
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
