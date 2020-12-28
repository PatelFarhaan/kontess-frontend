
import React from "react";
//import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
//import * as session from "../../../utils/session";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch, postDelete } from "../../../utils/fetchRequests";
import { Loading } from '../../globals/contants';
import AddUpdateTrack from './addUpdateTrack'
import { commonErrorMsg } from "../../../utils/Message";

export default class ManageTracks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount = () => {
        this.getTracks();
    }

    /**function for get team tracks */
    getTracks = async () => {
        let self = this;
        await getFetch(`track/`).then((resp) => {
            if (resp.data) {
                self.setState({
                    tracks: resp.data
                })
            }
        }).catch(err => { })
    }

    deleteTrack = async (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this track',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmDelete(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    confirmDelete = async (id) => {
        let self = this;
        self.setState({
            loading: true
        })
        await postDelete(`track/${id}/`).then((resp) => {
            self.setState({
                loading: false
            })
            if (resp.status === 200) {
                toast.success(resp.msg);
                self.getTracks();
            } else {
                toast.error(commonErrorMsg);
            }
        }).catch(err => {
            self.setState({
                loading: false
            })
            toast.error(err);
        })
    }
    getTrack = (id) => {
        this.setState({
            id: id
        })
    }
    render() {
        let { tracks, loading, id } = this.state;
        return (
            <DashboardTemplate title="Manage Tracks" pageId="tracks" loading={loading}>
                <div className="setting_container">
                    <div className="card-header d-flex align-items-center">
                        <div className="col-md-8 pull-left"><h4 className="mb-0 text-muted">Tracks</h4></div>
                        <div className="col-md-4 text-right">
                            <button className="btn btn-md btn-primary px-4 rounded-0" data-toggle="modal" data-target="#addUpdateTrack" onClick={() => this.getTrack()}>Add Track</button>
                        </div>
                    </div>

                    <table className="ui striped table">
                        <thead className="">
                            <tr className="">
                                <th className="">Track</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {tracks ? tracks.length ? tracks.map((track, index) =>
                                <tr className="">
                                    <td className="">
                                        <h4 className="ui image header">
                                            <div className="content">
                                                {track.track_name}
                                            </div>
                                        </h4>
                                    </td>
                                    <td className="text-center">
                                        <i title="Edit" data-toggle="modal" data-target="#addUpdateTrack" onClick={() => this.getTrack(track.id)} className="far fa-edit fa-lg text-primary"></i>
                                        <i title="Delete" onClick={() => this.deleteTrack(track.id)} className="far fa-trash-alt fa-lg ml-2"></i></td>
                                </tr>
                            ) : <div className="comment-widgets mb-3">
                                    <div className="d-flex flex-row comment-row">
                                        No track found
                                     </div>
                                </div> : <Loading />}

                        </tbody>
                    </table>
                </div>
                <AddUpdateTrack id={id} callBack={this.getTracks} />
            </DashboardTemplate>
        );
    }
}