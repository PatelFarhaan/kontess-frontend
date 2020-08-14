
import React from "react";
import * as routes from '../../globals/endpoints';
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
import * as session from "../../../utils/session";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import queryString from 'query-string';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";

export default class JoinTeam extends React.Component {
    constructor(props) {
        super(props);
        const teamId = this.props.match.params.teamId;
        this.state = {
            loading: false,
            message: '',
            teamId: teamId,
            confirm: 0
        };
    }

    componentWillMount = async () => {
        let queryParams = queryString.parse(this.props.location.search);
        queryParams = JSON.parse(JSON.stringify(queryParams));
        let user_id = queryParams.user_id;
        let loggedIn = await this.checkIfLoggedIn(user_id);
        !loggedIn ? this.props.history.push("/login?return_url=join_Team&team=" + this.props.match.params.teamId + "?user_id=" + user_id) : await this.joinTeam("");
    }

    checkIfLoggedIn = async (user_id) => {
        let userId = await session.getSessionUserId();
        if (!userId) {
            return false;
        }
        else {
            if (user_id != userId) {
                session.clearSession();
                return false
            }
        }
        return true;
    }

    // Participant to join team
    joinTeam = async (status) => {
        let self = this;
        let userId = await session.getSessionUserId();
        let data = { "userId": userId, message: "", status: "accepted" };
        self.setState({ loading: true })
        await fetch(routes.baseURL + `team/${self.state.teamId}/join_team/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: await routes.reqHeader()
        }).then(function (response) {
            self.setState({ loading: false })
            return response.json();
        }).then(function (responseBody) {
            self.setState({ loading: false })
            // If success
            if (responseBody.status === 200 && responseBody.msg) {
                toast.success(responseBody.msg);
                self.setState({
                    message: ""
                });
                // Navigate to the team view page
                self.props.history.push(`/dashboard/team_view/${self.state.teamId}`);
            } else {
                self.setState({
                    message: responseBody.msg ? responseBody.msg : noResultFoundMsg,
                    confirm: 1
                });
            }
        })
            .catch(function (error) {
                self.setState({
                    loading: false,
                    message: commonErrorMsg,
                    confirm: 1
                })
            });
    }


    render() {
        return (
            <DashboardTemplate title="Join Team" pageId="team_info" loading={this.state.loading}>
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <p className='red'>{this.state.message}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </DashboardTemplate >


        );
    }
}
