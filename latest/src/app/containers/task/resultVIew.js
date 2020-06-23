
import React from "react";
import * as session from "../../../utils/session";

export default class ResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      judges: this.props.judges,
      questions: this.props.questions,
      task_grading: this.props.task_grading
    };
  }
  componentWillMount = async () => {
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType
    })

  }
  getScore = (questionId, judgeId) => {
    let result = '---';
    let self = this;
    this.state.task_grading.map(function (item) {
      if (item.status === 'Publish' && item.judge.id === judgeId) {
        item.grades.map(function (grade) {
          if (grade.questions.id === questionId) {
            result = grade.score;
            if (grade.comment) {
              let id = questionId + '_' + judgeId;
              result = <div className="score-view position-relative">
                <span className="d-block text-primary" onClick={() => self.showCommnet(id)}>{result}</span>
                {self.state[id] ? <div className="score-view-comment position-absolute bg-white p-3 border shadow" >
                  <button onClick={() => self.showCommnet(id)} type="button" className="close"><span>×</span></button>
                  <p className="mb-0 text-dark">{grade.comment}</p>
                </div> : ''}
              </div>
            }
          }
        });
      }
    });
    return result;
  }
  showCommnet = (id) => {
    this.setState({
      [id]: !this.state[id],
    })
  }
  getOverAll = (type, index, judgeId) => {
    let result = 0;
    let self = this;
    let total_judge = 0;
    if (type === 'y') {
      this.state.task_grading.map(function (item) {
        if (item.status === 'Publish' && item.grades[index]) {
          total_judge++;
          result = result + item.grades[index].score;
        }
      });
    } else if (type === 'x') {
      this.state.task_grading.map(function (item) {
        if (item.status === 'Publish' && item.judge.id === judgeId) {
          item.grades.map(function (grade) {
            result = result + grade.score;
          });
          if (item.over_all_comments) {
            let id = judgeId;
            result = <div className="score-view position-relative">
              <span className="d-block text-primary" onClick={() => self.showCommnet(id)}>{result}</span>
              {self.state[id] ? <div className="score-view-comment position-absolute bg-white p-3 border shadow" >
                <button onClick={() => self.showCommnet(id)} type="button" className="close"><span>×</span></button>
                <p className="mb-0 text-dark">{item.over_all_comments}</p>
              </div> : ''}
            </div>
          }
        }
      });
    } else {
      this.state.task_grading.map(function (item) {
        if (item.status === 'Publish') {
          total_judge++;
          item.grades.map(function (grade) {
            result = result + grade.score;
          });
        }
      });
    }
    return total_judge === 0 ? result : parseFloat(result / total_judge).toFixed(1);
  }

  render() {
    const { judges, questions, UserType } = this.state;
    return (
      <div className="view-result">
        <h6 className="text-dark mb-4">Tip: clicking on blue scores will reveal comment for that specific score</h6>
        <div className="card">
          <div className="card-body">
            <table className="table judge-table">
              <thead>
                <tr>
                  <th className="first-row"></th>
                  {judges ? judges.length ? judges.map((judge, index) => (
                    <th scope="col">Judge {index + 1} {UserType === 'admin' ? '( ' + judge.full_name + ' )' : ''}</th>
                  )) : '' : ''}
                  <th scope="col">Overall</th>
                </tr>
              </thead>
              <tbody>
                {questions ? questions.map((question, i) =>
                  <tr>
                    <th className="first-row">{question.question}</th>
                    {judges ? judges.map((judge, j) =>
                      <td>{this.getScore(question.id, judge.id)}</td>
                    ) : ''}
                    {this.state.task_grading ? <td>{this.getOverAll('y', i)}</td> : ''}
                  </tr>
                ) : ''}

              </tbody>
              <tfoot>
                <tr>
                  <th className="first-row">Overall</th>
                  {judges ? judges.map((judge, i) => (
                    <th scope="col">{this.getOverAll('x', i, judge.id)}</th>
                  )) : ''}
                  {this.state.task_grading ? <th scope="col" className="text-danger">{this.getOverAll('all')}</th> : ''}
                </tr>
              </tfoot>

            </table>
          </div>
        </div>
      </div>
    );
  }
}
