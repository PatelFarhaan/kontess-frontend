
import React from "react";
import { toast } from 'react-toastify';
import * as session from "../../../utils/session";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch, postFetch } from "../../../utils/fetchRequests";

const notificationsJson = [
  {
    type: 'New announcement',
    for: 'all',
    key: 'new_announcement'
  }, {
    type: 'New events',
    for: 'all',
    key: 'new_events'
  }, {
    type: 'New task',
    for: 'participant',
    key: 'new_task'
  }, {
    type: 'Task is due today',
    for: 'participant',
    key: 'task_due_today'
  }, {
    type: 'Result is posted',
    for: 'participant',
    key: 'result_is_posted'
  }, {
    type: 'Your team received a join request',
    for: 'participant',
    key: 'team_join_request'
  }, {
    type: 'Some invited you to join a team',
    for: 'participant',
    key: 'invited_join_request'
  }, {
    type: 'You were approved to join a team',
    for: 'participant',
    key: 'approve_join_request'
  }, {
    type: 'Team events',
    for: 'participant',
    key: 'team_events'
  }, {
    type: 'Team tasks',
    for: 'participant',
    key: 'team_tasks'
  }, {
    type: 'Grading is now open',
    for: 'judge',
    key: 'grading_open'
  }, {
    type: 'Grade is due today',
    for: 'judge',
    key: 'grading_due_today'
  }, {
    type: 'You were assigned as a coach',
    for: 'judge',
    key: 'assing_as_mentor'
  }, {
    type: 'Coach request approved',
    for: 'judge',
    key: 'mentor_request_approved_status'
  }
]

export default class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: []
    };
  }

  componentWillMount = async () => {
    let userType = await session.getUserType();
    this.setState({
      userType: userType,
    })
    this.getSettings();
  }

  // get notifications
  getSettings = async (offset = 0) => {
    let self = this;
    this.setState({
      loading: true
    })
    await getFetch(`user/email-setting/`)
      .then(resp => {
        self.setState({
          loading: false
        })
        if (resp) {
          self.setState(
            {
              settings: resp.data,
            }
          );
        }
      })
      .catch(err => {
        self.setState({
          loading: false
        })
      });
  };

  handleCheckBox = async (e, key) => {
    let data = {
      [key]: e.target.checked
    }
    let self = this;
    self.setState({
      loading: true
    })
    await postFetch('user/email-setting/', data)
      .then(function (resp) {
        if (resp.status === 200) {
          self.setState({
            settings: resp.data,
            loading: false
          });
        } else {
          toast.error(resp.msg);
        }
      })
      .catch(function (error) {
        self.setState({
          loading: false
        })
      });
  }


  render() {
    let { userType, loading, settings } = this.state;
    return (
      <DashboardTemplate title="Notifications Settings" pageId="settings" loading={loading}>
        <div>
          <h4 className="w-100 py-3 text-secondary">All of these activities are notified in the platform. If you would like additional email notifications, please check the boxes.</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  {notificationsJson.map((notification, index) =>
                    notification.for === userType || notification.for === 'all' ?
                      <div class="row justify-content-center gQ fadeInAnimation">
                        <div class="col-md-6">
                          <div class="form-group">
                            <h5 className="text-secondary ">{notification.type}</h5>
                          </div>
                        </div>
                        <div class="col-md-6 text-center pt-2">
                          <div class="form-group">
                            <div class="form-group custom-checkbox">
                              <input type="checkbox" id={'select' + index} name="notification" checked={settings[notification.key]} onChange={(e) => this.handleCheckBox(e, notification.key)} />
                              <label class="bg-black" for={'select' + index}>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> : ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}