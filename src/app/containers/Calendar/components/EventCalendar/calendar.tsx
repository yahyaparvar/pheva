import React, { useState } from "react";
import { CalendarContainer, Dropdown, ViewSwitcher } from "./calender.styles";
import DayView from "./dayView";
import MonthView from "./monthView";
import YearView from "./yearView";

const Calendar: React.FC = () => {
  const [view, setView] = useState<"month" | "day" | "year">("month");

  const renderView = () => {
    switch (view) {
      case "month":
        return <MonthView />;
      case "day":
        return <DayView />;
      case "year":
        return <YearView />;
      default:
        return <MonthView />;
    }
  };

  return (
    <CalendarContainer>
      <ViewSwitcher>
        <Dropdown
          onChange={(e) => setView(e.target.value as "month" | "day" | "year")}
          value={view}
        >
          <option value="month">Month</option>
          <option value="day">Day</option>
          <option value="year">Year</option>
        </Dropdown>
      </ViewSwitcher>
      {renderView()}
    </CalendarContainer>
  );
};

export default Calendar;
