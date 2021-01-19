import React from "react";
import Moment from 'react-moment';
import moment from 'moment';
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { postFetch } from "../../../utils/fetchRequests";
export default class Card extends React.Component {

  // Accept or reject the join req
  responseToReq = async (id, res) => {
    let self = this;
    let data = {
      status: res
    };
    await postFetch('judge-request/' + id + '/update/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };

  render() {
    return (
      <div >
        {this.props.requests.length ? this.props.requests.map((request, index) =>
          <div key={index} className="card nofity-list  overflow-hidden">
            <div className="comment-widgets">
              <a key={request.id} className="notify-item" >
                <div className="notify-text">
                  <h3 > {request.judge.user.full_name} <span className={`badge ${request.status === 'pending' ? 'badge-info' : request.status === 'rejected' ? 'badge-danger' : 'badge-success'}`}>{request.status}</span> </h3>
                  <h4> {request.judge.user.email}</h4>
                  <div>
                    <span>
                      <Moment
                        from={moment().format('YYYY-MM-DD hh:mm:ss')}
                      >
                        {request.created_on}
                      </Moment>
                    </span>
                    {request.status === 'pending' ?
                      <button
                        onClick={e =>
                          this.responseToReq(
                            request.id,
                            'rejected'
                          )
                        }
                        className="btn btn-danger float-right"
                      >
                        Reject
                                </button> : ''}
                    {request.status === 'pending' ? <button
                      onClick={e =>
                        this.responseToReq(
                          request.id,
                          'approved'
                        )
                      }
                      className="btn btn-success float-right"
                    >
                      Approve
                                </button> :
                      ''}

                  </div>
                </div>


              </a>
            </div>

          </div>
        ) : <div className="comment-widgets mb-3">
            <div className="d-flex flex-row comment-row">
              {noResultFoundMsg}
            </div>
          </div>}
      </div>


    );
  }
}
