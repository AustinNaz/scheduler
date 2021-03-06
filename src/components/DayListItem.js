import React from "react";

import "components/DayListItem.scss";

let classNames = require("classnames");

export default function DayListItem(props) {
  const listClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected
    },
    {
      "day-list__item--full": props.spots === 0
    }
  );

  function formatSpots(spots) {
    let spotsString = `${spots} spots remaining`;

    if (spots === 0) {
      spotsString = "no spots remaining";
    } else if (spots === 1) {
      spotsString = "1 spot remaining";
    }

    return spotsString;
  }

  return (
    <li
      className={listClass}
      data-testid={"day"}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
