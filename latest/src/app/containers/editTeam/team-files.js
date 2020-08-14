
import React from 'react';
import { toast } from 'react-toastify';
import { getFetch, postDelete } from '../../../utils/fetchRequests';
import { confirmAlert } from 'react-confirm-alert';
import { commonErrorMsg } from '../../../utils/Message';
import * as routes from '../../globals/endpoints';
import Pagination from '../../components/pagination';
import * as session from "../../../utils/session";
import {
  deleteFileMsg
} from '../../../utils/Message';

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      teamFiles: [],
      sort: '',
      perPage: 10
    };
  }

  componentWillMount = async () => {
    let userId = await session.getSessionUserId();
    this.setState({
      userId: userId
    }, () => {
      this.getFiles();
    })
  };

  //show alert on file upload
  uploadAlert = fileName => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you want to sure you want to upload ' + fileName,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.submit(fileName)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  // upload file
  submit = async fileName => {
    let self = this;
    const formData = new FormData();
    formData.append('doc', self.state.files[0]);
    formData.append('doc_name', fileName);
    formData.append('team_id', self.props.teamId);
    await fetch(routes.baseURL + 'team_docs/', {
      method: 'POST',
      headers: await routes.reqHeaderMultipart(),
      body: formData
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response && response.msg) {
          self.getFiles();
          self.setState({ sort: '' });
          toast.success(response.msg);
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };

  // handle pagination
  handlePagination = data => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getFiles(offset);
  };

  /**function for get team files */
  getFiles = async offset => {
    let sort = this.state.sort;
    let self = this;
    await getFetch(
      `team_docs/?limit=${self.state.perPage}&offset=${offset}&sort_by=${sort}&team_id=${this.props.teamId}`
    )
      .then(resp => {
        if (resp.data) {
          self.setState({
            count: resp.count,
            teamFiles: resp.data
          });
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };

  // on file select
  fileSelectedHandler = e => {
    this.setState({ files: [...this.state.files, ...e.target.files] }, () => {
      let fileName = this.state.files[0];
      this.uploadAlert(fileName.name);
    });
  };

  // fuunction to handle changes in sort
  onChange = e => {
    this.setState({ sort: e.target.value });
    this.getFiles();
  };
  deleteFile = async (id) => {
    confirmAlert({
      title: 'Confirm',
      message: deleteFileMsg,
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
    await postDelete(`team_docs/${id}/`).then((resp) => {
      if (resp.status === 200) {
        toast.success(resp.msg);
        self.getFiles();
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
  render() {
    return (
      <div className="team-files my-3">
        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <div className="team-file-head d-flex justify-content-between mb-4">
              <h5 className="d-inline-block w-50">
                Team Files
                <div className="position-relative d-inline-block ml-5 w-50 btn-rounded">
                  <select
                    className="form-control rounded-pill"
                    onChange={this.onChange}
                    name="sort"
                  >
                    <option value="created_on">Date (Ascending)</option>
                    <option value="-created_on">Date (Descending)</option>
                  </select>
                  <div className="select-icon-absolute position-absolute">
                    <i className="fa fa-caret-down"></i>
                  </div>
                </div>
              </h5>
              <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input
                  type="file"
                  name="myfile"
                  onChange={this.fileSelectedHandler}
                />
              </div>
            </div>
            <ul className="list-unstyled">
              {this.state.teamFiles.length
                ? this.state.teamFiles.map((file, index) => (
                  <li key={index} className="position-relative">
                    <div className="comment-widgets bg-white no-hover p-1 border border-dark mb-0">
                      <div className="d-flex flex-row comment-row border-0">
                        <div className="file-detail w-100 border-0 ml-0 pl-0">
                          <h6 className="text-muted mb-0">
                            <a href={file.doc} download target="_blank">
                              {file.doc_name}
                            </a>
                          </h6>
                        </div>
                        <div className="file-state w-100 text-right">
                          <span>
                            Uploaded By:{' '}
                            {file &&
                              file.created_by &&
                              file.created_by.full_name
                              ? file.created_by.full_name
                              : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    {this.state.userId === file.created_by.id ?
                      <i title="Delete" onClick={() => this.deleteFile(file.id)} className="fa fa-trash px-1 ml-2 deleteDoc"></i> : ''}
                  </li>
                ))
                : 'No file found'}
              <Pagination
                perPage={this.state.perPage}
                count={this.state.count}
                handlePageClick={ev => this.handlePagination(ev)}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
