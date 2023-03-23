import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
    const {days, value, onChange} = props;

    const dayItems = days.map(dayObj => {
      return <DayListItem
          key={dayObj.id}
          name={dayObj.name}
          spots={dayObj.spots}
          selected={dayObj.name === value}
          setDay={onChange}
        />
})

    return (
      <ul>
       {dayItems}  
      </ul>
    );
  }