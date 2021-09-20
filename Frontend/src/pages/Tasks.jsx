import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import TasksPanel from "../components/TasksPanel";
import { getAccessTokenApi } from "../api/auth";
import {
  getTasksApi,
  getAllTasksCompletedApi,
  countAllLateTasksApi,
  countAllPendingTasksApi,
  countAllTasksCompletedApi,
} from "../api/tasks";
import CalendarPanel from "../components/CalendarPanel";
import StatsPanel from "../components/StatsPanel";
import moment from "moment";

const Tasks = (props) => {
  const { user } = props;
  // console.log(user);
  const [pendingTasks, setPendingTasks] = useState();
  const [finishedTasks, setFinishedTasks] = useState();
  const [reloadData, setReloadData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [taskDate, setTaskDate] = useState(moment().format("yyyy-MM-DD"));
  const [late, setLate] = useState(0);
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);

  const token = getAccessTokenApi();

  useEffect(() => {
    getTasksApi(token, taskDate).then((response) => {
      setPendingTasks(response.tasks);
      //setReloadData(false);
    });

    getAllTasksCompletedApi(token).then((response) => {
      setFinishedTasks(response.tasks);
      //setReloadData(false);
    });

    countAllLateTasksApi(token).then((response) => {
      setLate(response.tasks);
      //setReloadData(false);
    });

    countAllPendingTasksApi(token).then((response) => {
      setPending(response.tasks);
      //setReloadData(false);
    });

    countAllTasksCompletedApi(token).then((response) => {
      setDone(response.tasks);
      //setReloadData(false);
    });
    setReloadData(false);
  }, [token, reloadData, taskDate]);

  return (
    <>
      <Row>
        <Col span={8}>
          <CalendarPanel user={user} setTaskDate={setTaskDate} />
        </Col>
        <Col span={8}>
          <TasksPanel
            pendingTasks={pendingTasks}
            finishedTasks={finishedTasks}
            setReloadData={setReloadData}
            token={token}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </Col>
        <Col span={8}>
          <StatsPanel late={late} pending={pending} done={done} />
        </Col>
      </Row>
    </>
  );
};

export default Tasks;
