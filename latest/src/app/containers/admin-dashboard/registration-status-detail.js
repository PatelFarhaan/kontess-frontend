
import React from "react";
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from "moment";
import Chart from 'chart.js';
export default class RegistrationStatusDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participant_count: '',
            judge_count: '',
            status: false,
            date: "",
            chartLoaded : false
        };
    }

    formHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    handleCheckBox = () => {
        this.setState({
            status: !this.state.status
        })
    }

    componentWillMount = async () => {
        let UserType = await session.getUserType();
    }

    componentWillReceiveProps(nextProps,prevProps) {
      // let data =  [
      //   {
      //     "date": "2021-03-13",
      //     "count": 1
      //   },
      //   {
      //     "date": "2021-03-14",
      //     "count": 4
      //   },
      //   {
      //     "date": "2021-03-15",
      //     "count": 2
      //   },
      //   {
      //     "date": "2021-03-16",
      //     "count": 5
      //   },
      //   {
      //     "date": "2021-03-17",
      //     "count": 13
      //   },
      //   {
      //     "date": "2021-03-18",
      //     "count": 23
      //   },
      //   {
      //     "date": "2021-03-19",
      //     "count": 45
      //   },
      //   {
      //     "date": "2021-03-20",
      //     "count": 34
      //   }
      // ]
      if(nextProps && nextProps.userData && nextProps.userData.date_wise_count) {
        let data = nextProps.userData.date_wise_count;
        let totalCount = data.reduce(function (acc, obj) { return acc + obj.count; }, 0); // 7
        let count = data.map((el) => {
          return  el.count;
          });
      // setTimeout(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels:data.map((el) => {
            return  moment(el.date ).format('ddd');
            }),
            datasets: [{ 
              label: 'No of people',
                data:data.map((el) => {
                  return  el.count;
                  }), 
              }]
            
          },
          options: {
            title: {
              display: true,
              text: 'Total registration past 7 days:' + totalCount
            }
          }
        }
        );
      // }, 1000);
      }
      }
      // get the number
  getNumber = (value) => {
    return value ? value : 0;
  }
 

    render() {
        const { status } = this.state;
        return (
                <div className="modal fade" id="registrationStatusDetail">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Registration Status</h5>
                                <button type="button" className="close" id="closeRegistration" data-dismiss="modal">&times;</button>
                            </div>
                                <div className="modal-body">
                                   <div className = "row">
                                    <div className = "col-6">
                                    <ul className="mt-2 mb-4">
                        <li>
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(this.props.userData.participant_count)}</strong><small> Participant{this.props.userData.participant_count > 1 ? 's' : ''}</small>
                          </h6>
                        </li>
                      </ul>
                      <ul className="mt-2 mb-4">
                      
                        <li>
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(this.props.userData.judges_count)} </strong> <small> Judge{this.props.userData.judges_count > 1 ? 's' : ''}</small>
                          </h6>
                        </li>
                      </ul>
                      <ul className="mt-2 mb-4">
                      
                      <li>
                        <h6 className="text-muted">
                          <strong className="count">{this.getNumber(this.props.userData.teams_count)} </strong> <small> Team{this.props.userData.teams_count > 1 ? 's' : ''}</small>
                        </h6>
                      </li>
                    </ul>

                                    </div>
                                    <div className="col-6">
    <a href="/kontess/dashboard/people" className="btn float-right">See all people</a>
                                    </div>
                                   </div>
                                   <div class="row">
                                      <div class="col-12 m-auto">
                                      {
                              this.props.userData.date_wise_count ? 
                           <canvas id="myChart" width="400" height="400"  ></canvas>
                          : <h6 class="text-center text-weight-bold">
                            Charts cannot be displayed
                          </h6>
                          }      
                                       </div>
                                   </div>
                                </div>
                                {/* <div className="modal-footer">
                                    <button id="submit_btn" type="submit" className="btn btn-primary">Submit </button>
                                </div> */}
                        </div>
                    </div >
                </div >
        );
    }
}
