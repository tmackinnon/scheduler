import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let spot = props.spots;
  const day = props.name;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !spot
  });

  const formatSpots = function() {
    if (spot === 1) return "1 spot remaining";
    if (!spot) spot = "no";
    return `${spot} spots remaining`;
  };

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(day)}
      data-testid="day"
    >
      <h2 className="text--regular">{day}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}