import React from "react";
import { Calendar, Typography } from "antd";
import moment from "moment";

import "../css/CalendarPanel.css";
import ToDoImage from "../assets/images/todo_list1600.png";

const CalendarPanel = ({ setTaskDate, user }) => {
  const { Title, Paragraph } = Typography;

  return (
    <div className="calendar-panel">
      <div className="presentation">
        <img src={ToDoImage} alt="" className="todo-image" />
        <div className="presentation-text">
          <Typography>
            <Title level={5}>{`Hi ${user.name}!`}</Title>
            <Paragraph>
              Remember that you can use the calendar to see pending tasks!
            </Paragraph>
          </Typography>
        </div>
      </div>
      <Calendar
        onSelect={(e) => setTaskDate(moment(e).format("yyy-MM-DD"))}
        fullscreen={false}
      />
    </div>
  );
};

export default CalendarPanel;
