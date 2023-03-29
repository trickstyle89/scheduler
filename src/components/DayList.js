import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
    const {days, setDay} = props;

    const dayItems = days.map(dayObj => {
      return <DayListItem
          key={dayObj.id}
          name={dayObj.name}
          spots={dayObj.spots}
          selected={dayObj.name === props.day}
          setDay={() => setDay(dayObj.name)}  // onChange? Look back.
        />
})

    return (
      <ul>
       {dayItems}  
      </ul>
    );
  }