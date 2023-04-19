import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(num) {
    if (num === 1) return "1 spot";
    if (!num) num = "no";
    return `${num} spots`
  }

  let spots = formatSpots(props.spots)
  const day = props.name;

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(day)}
    >
      <h2 className="text--regular">{day}</h2> 
      <h3 className="text--light">{spots} remaining</h3>
    </li>
  );
}