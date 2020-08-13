import React from "react";

const TaskList = ({ data, key }) => (
  <div className="task_col" key={key}>
    <span>
      <img src={data.icon} alt />
    </span>
    <h4>{data.title}</h4>
  </div>
);

export default TaskList;