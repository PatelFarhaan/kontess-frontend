
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { getFetch } from "../../../utils/fetchRequests";
import { commonErrorMsg, only6ImgAllow } from "../../../utils/Message";
import PDFICON from "../../../assets/icons/pdf.png";
import XLSXICON from "../../../assets/icons/xlsx.png";
import XSLCON from "../../../assets/icons/xls.png";
import CSVICON from "../../../assets/icons/csv.png";
import FILEICON from "../../../assets/icons/file.png";

export default class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team_name: '',
            files: [],
            imagePreviewUrl: '',
            description: '',
            loading: false,
            logo: '',
            logoImg: '',
            track: '',
            tracks: [],
        }
        this.formHandler = this.formHandler.bind(this)
    }
    componentWillMount = async () => {
        this.getTracks();
    }

    fileSelectedHandler = e => {
        if (this.state.files.length + e.target.files.length <= 6) {
            this.setState({ files: [...this.state.files, ...e.target.files] }
                , () => {
                    this.renderImg();
                }
            )
        }
        else {
            alert(only6ImgAllow)
        }
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
    logoSelectedHandler = e => {
        this.setState({ logo: e.target.files[0] })
        let self = this;
        var reader = new FileReader();
        reader.onload = function (event) {
            self.setState({
                logoImg: reader.result
            })
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    formHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    removeImg = (index) => {
        let tempArr = this.state.files
        tempArr.splice(index, 1)
        this.setState({ files: tempArr }, () => {
            this.renderImg();
        })
    }

    renderImg = async () => {
        let self = this;
        var filesAmount = this.state.files.length;
        for (var i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            // String extension = render.files.type
            let filetype = self.state.files[i].type;

            reader.onload = function (event) {
                self.setState({
                    [i - 1]: filetype.indexOf('image') !== -1 || filetype.indexOf('video') !== -1 ? reader.result : self.renderFileIcon(filetype)
                })
            }
            reader.readAsDataURL(self.state.files[i]);
        }
    }

    renderFileIcon = (filetype) => {
        switch (filetype) {
            case 'application/pdf':
                return PDFICON;
            case 'xlsx':
                return XLSXICON;
            case 'xls':
                return XSLCON;
            case 'text/csv':
                return CSVICON;
            case 'application/vnd.ms-excel':
                return XSLCON;
            default:
                return FILEICON;
        }
    }

    submit = async () => {
        const { team_name, description, track } = this.state;
        var validation = `${
            !team_name ? 'Please enter team name' :
                !description ? 'Please enter team introduction' : !track ? 'Please select a track' : true}`
        if (validation === 'true') {
            this.setState({
                loading: true
            })
            let self = this;
            const formData = new FormData()
            formData.append('name', team_name);
            formData.append('description', description);
            formData.append('team_track', track);
            this.state.files.forEach((file, i) => {
                formData.append('portfolio', file)
            })
            if (this.state.logo) {
                formData.append('logo', this.state.logo)
            }
            fetch(routes.baseURL + 'team/', {
                method: 'POST',
                headers: await routes.reqHeaderMultipart(),
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (res) {
                self.setState({
                    loading: false
                })
                if (res.status === 200) {
                    toast.success('Your team created successfully');
                    setTimeout(function () { self.props.history.push("/dashboard/team_info"); }, 3000);
                } else {
                    toast.error(res.msg);
                }
            })
                .catch(function (error) {
                    self.setState({
                        loading: false
                    })
                    toast.error(commonErrorMsg);
                });
        } else {
            toast.error(validation);
        }
    }
    backToList = () => {
        this.props.history.push("/dashboard/team_info");
    }
    change = (event) => {
        this.setState({ track: event.target.value });
    }
    render() {
        return (
            <DashboardTemplate title="Create Team" pageId="team_info" loading={this.state.loading}>
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="head-row">
                            <div className="row teamInfo">
                                <div className="col-md-2">
                                    <label htmlFor="choose-logo" className="py-3 px-2 w-50 border border-secondary bg-transparent text-center teamLogo"
                                        style={{
                                            backgroundImage: 'url(' + this.state.logoImg + ')',
                                        }}
                                    >
                                        <span>{this.state.logoImg ? '' : 'Logo'}</span>
                                    </label>
                                    <input accept="image/x-png,image/gif,image/jpeg" id="choose-logo" className="choose-file" name="" type="file" onChange={this.logoSelectedHandler} />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group"> <label>Team Name</label><input name="team_name" value={this.state.team_name} onChange={this.formHandler} className="form-control" type="text" placeholder="Team Name" /></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative">
                                        <label>Team Track</label>
                                        <select className="form-control" onChange={(e) => this.change(e)} value={this.state.track}>
                                            <option>Select Track</option>
                                            {this.state.tracks.map(track => (
                                                <option value={track.slug}>{track.track_name}</option>
                                            ))}
                                        </select>
                                        <div className="select-icon-absolute position-absolute">
                                            <i className="fa fa-caret-down"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="team my-5">
                            <div className="row justify-content-between">
                                <div className="col-3">
                                </div>
                                <div className="col-9">
                                    <div className="tab-content" id="v-pills-tabContent">
                                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <h2 className="intro"><u>Introduction</u></h2>
                                            <div className="border border-secondary p-2">
                                                <div className="form-group">
                                                    <textarea value={this.state.description} name="description" onChange={this.formHandler} className="form-control" cols="7" rows="5"></textarea>
                                                </div>
                                                <div className="text-right">
                                                    <button className="bg-transparent btn btn-md border border-secondary text-secondary mx-2" onClick={this.backToList.bind(this)}>Cancel</button>
                                                    <button className="btn btn-md btn-primary text-white mx-2" onClick={this.submit.bind(this)}>Save</button></div>
                                            </div>
                                            <div className="upload-btn my-3 add-product-side-upload">
                                                <div className=" field-choose-file">
                                                    <input accept='image/*, video/*,application/pdf,.xlsx, .xls' id="choose-file" className="choose-file" name="" type="file" multiple onChange={this.fileSelectedHandler} />
                                                    <label htmlFor="choose-file" className="upload-file mx-5 text-light bg-primary ">
                                                        Upload media (max 6 images, videos 1 min, 200MB max)
                </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {this.state.files.map((file, index) =>
                                                    <div key={index} className="col-md-4 position-relative mb-4" >
                                                        {this.state[index] && this.state[index].indexOf('video') !== -1 ? <div className="border border-secondary cstm-box"> <video autoPlay controls>
                                                            <source type="video/mp4" src={this.state[index]} />
                                                        </video> <i onClick={(e) => this.removeImg(index)} className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "></i></div>
                                                            : <div className="content border border-secondary">
                                                                <a >
                                                                    <img className="content-image" src={this.state[index]} />
                                                                    <div>
                                                                    </div>
                                                                </a>
                                                                <i onClick={(e) => this.removeImg(index)} className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "></i>
                                                            </div>

                                                        }
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                            <h2 className="intro text-secondary"><u>Introduction</u></h2>
                                            <p className="text-secondary">Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur.</p>
                                            <div className="border border-secondary mx-5 my-4"><p className="p-5 text-center">Introductory Video, photos, slideshow...</p></div>
                                        </div>
                                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                            <h2 className="intro text-secondary"><u>Introduction</u></h2>
                                            <p className="text-secondary">Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur.</p>
                                            <div className="border border-secondary mx-5 my-4"><p className="p-5 text-center">Introductory Video, photos, slideshow...</p></div>
                                        </div>
                                        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                            <h2 className="intro text-secondary"><u>Introduction</u></h2>
                                            <p className="text-secondary">Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur.</p>
                                            <div className="border border-secondary mx-5 my-4"><p className="p-5 text-center">Introductory Video, photos, slideshow...</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </DashboardTemplate >
        );
    }
}
