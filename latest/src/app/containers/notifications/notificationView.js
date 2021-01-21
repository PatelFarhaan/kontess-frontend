
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
//import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
//import { toast } from 'react-toastify';
import { getFetch } from "../../../utils/fetchRequests";
//import Pagination from '../../components/pagination';
//import * as session from "../../../utils/session";
//import Modal from 'react-modal';
//import Moment from 'react-moment';

export default class NotificationView extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id;
        this.state = {
            loading: false,
            perPage: 10,
            count: 0,
            notifications: [],
            id: id,
        };
    }

    componentWillMount = async () => {
        let self = this;
        setTimeout(function () { self.getNotifiction(); }, 100);
    }

    // get notifications
    getNotifiction = async () => {
        let self = this;
        await getFetch(`notification/${this.state.id}`)
            .then(resp => {
                if (resp) {
                    self.setState(
                        {
                            notifications: [resp.data]
                        }
                    );
                }
            })
            .catch(err => { });
    };

    gotToNotifications = () => {
        this.props.history.push("/dashboard/notifications");
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getNotifictions(offset);
    }


    render() {
        return (
            <DashboardTemplate title="Notifications" pageId="notifications">
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="row">
                            <div className="col-lg-7 stretched_card mt-4">
                                <div className="card-header d-flex align-items-center">
                                    <div className="col-md-8 pull-left">
                                        <h4 className="mb-0 text-muted">Notification</h4>
                                    </div>
                                </div>
                                <Card callback={(e) => this.gotToNotifications()} notifications={this.state.notifications}></Card>
                            </div>

                        </div>
                    </section>
                </div>

            </DashboardTemplate>
        );
    }
}
