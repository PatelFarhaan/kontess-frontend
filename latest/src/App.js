
import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Landing,
  Registration,
  Login,
  Dashboard,
  TeamList,
  ParticipantList,
  ChatPage,
} from "./app/containers";
import NewLogin from './app/containers/newLogin/NewLogin'
import NewRegistratoin from './app/containers/NewRegistration-page/Registration'
import Settings from './app/containers/settings'
import profile from './app/containers/profile/profile'
import TeamInfo from "./app/containers/team-info";
import Team from "./app/containers/team";
import MyTeam from "./app/containers/myTeam/index";
import UserDashBoard from "./app/containers/UserDashBoard";
import EditTeam from "./app/containers/editTeam";
import "./light_theme.scss";
import Activity from "./app/containers/Activity";
import { PrivateRoute } from "./PrivateRoue";
import AdminDashboard from "./app/containers/admin-dashboard";
import JudgePlateform from "./app/containers/jugde-plateform";
import forgotPassword from "./app/containers/forgotPassword/forgotPassword";
import resetPassword from "./app/containers/restPassword/resetPassword";
import People from "./app/containers/people";
import * as session from "./utils/session";
import activateUser from "./app/containers/activate-user";
import InviteMember from "./app/containers/invite-members";
import JoinTeam from "./app/containers/join-team";
import notifications from './app/containers/notifications'
import notificationView from './app/containers/notifications/notificationView'
import TeamEvent from './app/containers/editTeam/createEvent';
import TeamTask from './app/containers/editTeam/create-team-task'
import PendingRequests from './app/containers/pending-requests'
import InviteJudge from "./app/containers/invite-judge";
import PendingTeamsApproval from "./app/containers/pending-team-approval";
import Task from "./app/containers/task";
import AdminTaskView from "./app/containers/task/adminTaskView";
import JudgeTaskView from "./app/containers/task/judgeTaskView";
import CreateModifyTask from "./app/containers/task/new-modify-task";
import TaskDetails from './app/containers/task/taskDetails';
import TaskDetailsJudge from './app/containers/task/taskDetails-judge';
import Result from './app/containers/task/result'
import Grading from './app/containers/task/grading'
import Tracks from './app/containers/tracks'
import NotificationSettings from './app/containers/settings/notification-settings'
import ChangePassword from './app/containers/settings/change-password'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      themeDark: JSON.parse(localStorage.getItem('isDark')),
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated'))
    };
  }
  onChangeTheme = () => {
    localStorage.setItem('isDark', !this.state.themeDark)
    this.setState({ themeDark: !this.state.themeDark })
  }
  checkAuth = (state) => {
    this.setState({ isAuthenticated: state })
  }
  componentDidMount() {
  }
  handleSignIn() {

  }
  handleLogOut() {
  }


  render() {
    return (
      <div className={this.state.themeDark ? "app_dark" : "app_light"}>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/registration" component={props => <NewRegistratoin checkAuth={this.checkAuth} />} />
              <PrivateRoute pathName={'/'} isAuthenticated path="/judge_plateform" component={JudgePlateform} />
              {/* <Route path="/login" component={props => <NewLogin checkAuth={(state) => this.checkAuth(state)} />} /> */}
              <Route path="/forgotPassword" component={forgotPassword} />
              <Route path="/resetPassword/:UID" component={resetPassword} />
              <Route path="/activate_user/:UID" component={activateUser} />
              <Route path={`/join_team/:teamId`} component={JoinTeam} />
              <Route
                isAuthenticated={this.state.isAuthenticated}
                path="/dashboard"
                render={({ match: { path } }) => (
                  <>
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/home`} component={session.getUserType() === "admin" ? AdminDashboard : UserDashBoard} />
                    <Route path={`${path}/listTeams`} component={TeamList} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/team_info`} component={TeamInfo} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/team`} component={Team} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/team/:ID`} component={Team} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/team_view/:teamId`} component={EditTeam} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/my_team`} component={MyTeam} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/events`} component={Activity} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/people`} component={People} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/invite_members/:teamId`} component={InviteMember} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/settings`} component={props => <Settings onChangeTheme={() => this.onChangeTheme()} />} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/profile/:id`} component={profile} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/notifications`} component={notifications} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/notification/:id`} component={notificationView} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/create-team-event/:teamId`} component={TeamEvent} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/edit-team-event/:teamId/:eventId`} component={TeamEvent} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/create-team-task/:teamId`} component={TeamTask} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/edit-team-task/:teamId/:taskId`} component={TeamTask} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/pending-requests`} component={PendingRequests} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/invite_judge/:teamId`} component={InviteJudge} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/pending-teams-approval`} component={PendingTeamsApproval} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/task`} component={session.getUserType() === "admin" ? AdminTaskView : session.getUserType() === 'judge' ? JudgeTaskView : Task} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/create-task`} component={CreateModifyTask} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/modify-task/:taskId`} component={CreateModifyTask} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/task-view/:taskId`} component={session.getUserType() === "admin" ? TaskDetails : session.getUserType() === 'judge' ? TaskDetailsJudge : ''} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/result`} component={Result} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated && session.getUserType() === "judge"} path={`${path}/grading`} component={Grading} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated && session.getUserType() === "admin"} path={`${path}/tracks`} component={Tracks} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated && session.getUserType() != "admin"} path={`${path}/notification-settings`} component={NotificationSettings} />
                    <PrivateRoute pathName={'/'} isAuthenticated={this.state.isAuthenticated} path={`${path}/change-password`} component={ChangePassword} />
                  </>
                )}
              />
              {/* <Route path="/" component={Landing} /> */}
              <Route path="/" component={props => <NewLogin checkAuth={(state) => this.checkAuth(state)} />} />
            </Switch>
          </div>
        </Router>
        <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} />
      </div>
    );
  }
}

export default App;