import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
    const {days, value, setDay} = props;

    const dayItems = days.map(dayObj => {
      return <DayListItem
          key={dayObj.id}
          name={dayObj.name}
          spots={dayObj.spots}
          selected={dayObj.name === value}
          setDay={() => setDay(dayObj.name)}  // onChange? Look back.
        />
})

    return (
      <ul>
       {dayItems}  
      </ul>
    );
  }