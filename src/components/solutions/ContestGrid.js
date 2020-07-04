import React from "react";

const ContestGrid = ({data}) => {
    return data.map((val, i) => (
      <div className="contest_box" key={i}>
        {/* <img src={val.image} alt /> */}
        <span><i className={val.iconclass}></i></span>
        <h4>{val.title}</h4>
        <p>{val.content}</p>
      </div>
    ));
}

export default ContestGrid; 