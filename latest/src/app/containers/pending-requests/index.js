
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
import { getFetch } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      perPage: 10,
      count: 0,
      requests: '',
      requestStatus: 'pending'
    };
  }

  componentWillMount = async () => {
    let self = this;
    setTimeout(function () { self.getRequests(); }, 100);
  }

  // get notifications
  getRequests = async (offset = 0, status = 'pending') => {
    let self = this;
    this.setState({
      requestStatus: status,
      loading: true
    })
    await getFetch(`judge-request/?status=${status}&limit=${self.state.perPage}&offset=${offset}`)
      .then(resp => {
        if (resp) {
          self.setState(
            {
              requests: resp.data,
              count: resp.count,
              loading: false
            }
          );
        }
      })
      .catch(err => {
        self.setState(
          {
            loading: false
          }
        );
      });
  };

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getRequests(offset, this.state.requestStatus);
  }


  render() {
    return (
      <DashboardTemplate title="Joining Requests Judge/Coach" pageId="pending-requests" loading={this.state.loading}>
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            <div className="row">
              <div className="col-lg-7 stretched_card mt-4">
                <div className="card-header d-flex align-items-center">
                  <div className="col-md-8 pull-left">
                    <h4 className="mb-0 text-muted">Joining Requests For Judge/Coach</h4>
                  </div>
                </div>
                <div className="ui pointing secondary menu">
                  <a  className={`item ${this.state.requestStatus === 'pending' ? 'active' : ''}`} onClick={(e) => this.getRequests()}>Pending</a>
                  <a  className={`item ${this.state.requestStatus === 'approved' ? 'active' : ''}`} onClick={(e) => this.getRequests(0, 'approved')}>Approved</a>
                  <a  className={`item ${this.state.requestStatus === 'rejected' ? 'active' : ''}`} onClick={(e) => this.getRequests(0, 'rejected')}>Rejected</a>
                  <a  className={`item ${this.state.requestStatus === '' ? 'active' : ''}`} onClick={(e) => this.getRequests(0, '')}>All Requests</a>
                </div>
                <Card requests={this.state.requests} callback={(e) => this.getRequests(0, this.state.requestStatus)}></Card>
                <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
              </div>

            </div>
          </section>
        </div>

      </DashboardTemplate>
    );
  }
}
