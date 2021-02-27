
import React from 'react';
//import * as session from '../../../utils/session';
import { getFetch/*, postFetch*/ } from '../../../utils/fetchRequests';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { Link } from "react-router-dom"
import ResultView from "./resultVIew";

export default class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: []
        };
    }

    componentWillMount = () => {
        if (this.props.location.state) {
            this.getTaskDetail();

        } else {
            this.props.history.push("/dashboard/task")
        }
    }

    /**function for get task details */
    getTaskDetail = async () => {
        let self = this;
        await getFetch(`participant_task/` + this.props.location.state.submitted_task_id + `/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        task_grading: resp.data.task_grading,
                        questions: resp.data.task.questions,
                        judges: resp.judges
                    })
                }
            })
            .catch(err => { });
    }

    render() {
        const { judges, questions, task_grading } = this.state;
        return (
            <DashboardTemplate title="Result View" pageId="task" loading={this.state.loading}>
                {judges ? <ResultView judges={judges} questions={questions} task_grading={task_grading} track_id={"track_id"}></ResultView> : ''}
                <div className="text-right p-3">
                    <Link to="/dashboard/task">
                        <button className="btn btn-md btn-primary px-4 rounded-0">Back</button>
                    </Link>
                </div>
            </DashboardTemplate>
        );
    }
}
