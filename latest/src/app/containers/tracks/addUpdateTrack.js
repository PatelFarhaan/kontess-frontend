
import React from "react";
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";

export default class AddUpdateTracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participant_count: '',
            judge_count: '',
            status: false
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
        this.setState({
            UserType: UserType
        })
        if (this.props.id) {
            this.getTrackDetails();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id) {
            this.setState({
                id: nextProps.id,
            }, () => {
                this.getTrackDetails()
            })
        } else {
            this.setState({
                id: null,
                track_name: ''
            })
        }
    }
    getTrackDetails = async () => {
        let self = this;
        await getFetch(`track/${this.state.id}/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        track_name: resp.data.track_name
                    });
                }
            })
            .catch(err => { });
    }

    submit = async event => {
        let self = this;
        self.setState({ error: '' });
        event.preventDefault();
        const { track_name, id } = self.state;
        const data = { track_name };
        let url = `track/`;
        if (id) {
            url = `track/${id}/edit/`;
        }
        await postFetch(url, data)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    document.getElementById("closeRegistration").click();
                    self.props.callBack();
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    };

    render() {
        const { id } = this.state;
        return (
            <div className="modal fade" id="addUpdateTrack">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{id ? 'Update' : 'Add'} Track</h5>
                            <button type="button" className="close" id="closeRegistration" data-dismiss="modal">&times;</button>
                        </div>
                        <form onSubmit={this.submit} id="newEventForm" >
                            <div className="modal-body">
                                <div className="new-task-form">
                                    <div className="form-group">
                                        <div className="form-sec">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3 text-right">
                                                        <label className="control-label font-weight-bold">Track Name</label>
                                                    </div>

                                                    <div className="col-md-8">
                                                        <input type="text" value={this.state.track_name} onChange={this.formHandler} name="track_name" className="form-control" placeholder="Track Name" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary"> {id ? 'Update' : 'Add'} </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        );
    }
}
