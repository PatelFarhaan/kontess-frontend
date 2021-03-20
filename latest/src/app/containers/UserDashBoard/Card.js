
import React from "react";
import Moment from 'react-moment';
import { patchFetch } from "../../../utils/fetchRequests";
import { toast } from 'react-toastify';
import ViewAnnouncement from './viewAnnouncement';
import AnnouncementDetail from './announcementDetail';
import { getFetch, postDelete } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination';
import * as session from "../../../utils/session";
import { commonErrorMsg, deleteAnnouncementMsg } from "../../../utils/Message";
import { confirmAlert } from 'react-confirm-alert';
import { Urlify } from '../../globals/contants';

export default class AnnouncementCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expend: false,
      showModal: false,
      announcementData: [],
      perPage: 3,
      announcementcount: 0,
      showStarred: false
    };
  }

  componentWillMount = async () => {
    let self = this;
    let userType = await session.getUserType();
    this.setState({
      userType: userType
    })
    setTimeout(function () { self.getAnnouncementData(); }, 100);
  }

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getAnnouncementData(offset);
  }

  // Get all announcements
  getAnnouncementData = async (offset = 0) => {
    let self = this;
    self.setState({
      loading: true,
    })
    let url = `announcement_status/?is_star=${this.state.showStarred}&limit=${self.state.perPage}&offset=${offset}`;
    if (this.state.userType === 'admin') {
      url = `announcement?limit=${self.state.perPage}&offset=${offset}`;
    }

    await getFetch(url).then((resp) => {
      self.setState({
        loading: false
      })
      if (resp.data) {
        let data = { announcementData: resp.data, announcementcount: resp.count };
        if(!this.state.initialData)
          data = { ...data, initialData: resp.data[0] };
        self.setState({...data});

      } else {
        toast.error(commonErrorMsg);
      }
    }).catch(err => {
      self.setState({
        loading: false
      })
    })
  }
  // get the announcements as starred or not starred
  starAnnouncement = async (id, index, is_star) => {
    let self = this;
    self.setState({
      loading: true,
    })
    let data = {}
    if (is_star !== null) {
      data = { is_star: !is_star }
    }
    await patchFetch(`announcement_status/${id}/update/`, data).then((resp) => {
      self.setState({
        loading: false
      })
      if (resp.msg) {
        if (is_star !== null) {
          self.state.announcementData[index].is_star = !self.state.announcementData[index].is_star;
        }
        self.state.announcementData[index].is_read = true;
        self.forceUpdate();
      }
    }).catch(err => {
    })
  }
  showAnnouncement = (announcement, index) => {
    this.setState({ announcement })
    this.starAnnouncement(announcement.id, index, null)
  }
  showStarredOnly = () => {
    this.setState({
      showStarred: !this.state.showStarred
    }, () => {
      this.getAnnouncementData()
    })
  }
  deleteAnnouncement = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: deleteAnnouncementMsg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  confirmDelete = async (id) => {
    let self = this;
    await postDelete(`announcement/` + id + `/`)
      .then(resp => {
        if (resp.status === 200) {
          self.getAnnouncementData();
          toast.success(resp.msg);
        } else {
          toast.error(resp.msg);
        }
      })
      .catch(err => { toast.error(commonErrorMsg); });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.refreshList === true) {
      this.getAnnouncementData();
    }
  }

  render() {
    const { userType,initialData, ...rest } = this.state;
    return (

      <div className="col-6">
      <div className="card">
      <div className = "card-header" style={{padding:"1rem 0 1rem 1rem"}}>
<h5 className="d-inline-block">{this.props.title}</h5>
{this.state.userType !== 'admin' ?
            <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block float-right">
              <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={(e) => this.showStarredOnly()} checked={this.state.showStarred} />
              <label className="custom-control-label ml-2" htmlFor="customCheck1">Show starred only</label>
            </div> : ''
          }
<a className="btn btn-default float-right" data-toggle="modal" data-target="#announcementDetail"  role="button" style={{paddingTop:"0px"}}>See past announcements</a>
</div>
<div className="card-body">
  <div class="card-text">
<div className="card">
          <div className="card-body px-2 py-2">
            <p className="ml-2 font-weight-bold">Your latest announcement</p>
            {initialData && initialData.announcement ?
              <div className={`comment-widgets mb-2 no-hover p-3 ${initialData.is_read === false ? 'bg-dark' : ''}`}>
                <div className="d-flex flex-row comment-row border-0 row" style={{
    alignItems: "center"}}>
                  <div className={`comment-text border-0 ml-0 pl-0 ${userType === 'admin' ? 'col-md-7' : 'col-md-9'}`} data-toggle="modal" data-target="#showAnnouncement" key={0} onClick={(e) => this.showAnnouncement(initialData.announcement, 0)}>
                    <h6 className="text-muted text-justify"
                      dangerouslySetInnerHTML={{
                        __html: Urlify(initialData.announcement.description)
                      }}
                    ></h6>
                  </div>
                  <div className="col-md-3 comment-icons text-right">
                    {this.state.userType !== 'admin' ?
                      <div className="rate-view ml-3 mb-3" onClick={() => this.starAnnouncement(initialData.announcement.id, 0, initialData.is_star)}>
                        <i className={`fa-star ` + (initialData.is_star ? "fas" : "far")} ></i>
                      </div> : ''}
                    <h6 className="m-b-5 text-muted d-block" >
                      <Moment format="MM/DD/YYYY">{initialData.announcement.created_on}</Moment></h6>
                    <h6 className="text-muted"> <Moment format="hh:mm a">{initialData.announcement.created_on}</Moment></h6>

                  </div>
                  {userType === 'admin' ? <div className="col-md-2 comment-icons text-right">
                    <span onClick={() => this.props.editAnnouncement(initialData.announcement.id)}><i className="fa fa-edit  px-1 text-primary fa-lg mr-2"></i></span>
                    <i onClick={() => this.deleteAnnouncement(initialData.announcement.id)} className="fa fa-trash px-1 fa-lg"></i>
                    {/* <i className="fa fa-ellipsis-v px-1 text-secondary"></i> */}
                  </div> : ''}
                </div>
              </div> 
             : <h5 className="font-weight-light  mb-4 text-muted">No announcement found for you!</h5>}
          </div>
        </div>
        </div>
        <div className="col d-flex justify-content-center">
<a className="btn btn-primary" onClick={() => this.props.scrollToBottom()} style={{ backgroundColor : "#007bff", color : "white"}}>Create new announcement</a>
              </div>
        <AnnouncementDetail data = {this.state} announcementData = {(offset) => this.getAnnouncementData(offset)} editAnnouncement={this.props.editAnnouncement} deleteAnnouncement = {this.deleteAnnouncement} starAnnouncement = {this.props.starAnnouncement} showAnnouncement = {this.showAnnouncement}/>

</div>
</div>
< ViewAnnouncement data={this.state.announcement}></ViewAnnouncement>

      </div>
      
    );
  }
}
