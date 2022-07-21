import React from "react";
import * as BsIcons from "react-icons/bs";

function Rating({ value, text, color }) {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? <BsIcons.BsStarFill />
              : value >= 0.5
              ? <BsIcons.BsStarHalf />
              : <BsIcons.BsStar />
          }
        ></i>
      </span>

      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
