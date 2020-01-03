/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as routes from '../../globals/endpoints';
import { commonErrorMsg } from "../../../utils/Message";

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      message: '',
      NavigateToLogin: false
    };
  }

  componentWillMount = async () => {
    let self = this;
    self.setState({ showLoader: true })
    let id = this.props.match.params.UID;
    await fetch(routes.baseURL + `user/activate/?user_id=${id}`, {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (responseBody) {
      self.setState({ showLoader: false })
      if (responseBody.status === 200) {
        self.setState({ message: responseBody.msg, NavigateToLogin: true });
      } else {
        self.setState({
          message: responseBody.msg,
          NavigateToLogin: false
        });
      }
    })
      .catch(function (error) {
        self.setState({
          showLoader: false,
          message: commonErrorMsg,
          NavigateToLogin: false
        })
      });
  }


  render() {
    return (
      <div className="modal-background">
        <div className="modal-wrapper">
          <div className="auth-modal">
            <h1>
              {this.state.showLoader ?
                <div className="loadingContainer"><div className="ui active inline loader"></div> loading Please wait... </div> :
                this.state.message
              }
            </h1>
            <h3>
              {this.state.NavigateToLogin ?
                <div className="mt-30">Please  <Link className="underLine" to="/">login <i className="fas fa-sign-in-alt"></i></Link>  to proceed.</div> : ''
              }
            </h3>
          </div>
        </div>
      </div >
    );
  }
}
export default withRouter(ActivateUser);
