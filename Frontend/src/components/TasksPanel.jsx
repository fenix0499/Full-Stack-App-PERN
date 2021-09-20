import React from "react";
import {
  Typography,
  Tabs,
  Card,
  Collapse,
  Tag,
  Tooltip,
  Button,
  Empty,
  notification,
} from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { setTasksCompletedApi } from "../api/tasks";
import AddTaskModal from "../components/AddTaskModal";

import "../css/TasksPanel.css";

const TasksPanel = ({
  pendingTasks,
  finishedTasks,
  setReloadData,
  token,
  isVisible,
  setIsVisible,
}) => {
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const { Title } = Typography;

  const markTaskCompleted = async (data) => {
    try {
      let response = await setTasksCompletedApi(token, data.id);

      if (response.status === 200) {
        notification["success"]({
          message: response.message,
        });
        setReloadData(true);
      } else {
        notification["error"]({
          message: response.message,
        });
      }
    } catch (ex) {
      notification["error"]({
        message: "Error al actualizar tarea...",
      });
    }
  };

  return (
    <div className="tasks-panel">
      <AddTaskModal
        isVisible={isVisible}
        setReloadData={setReloadData}
        setIsVisible={setIsVisible}
        token={token}
      />
      <Typography>
        <Title level={2}>Tasks</Title>
        <Tooltip title="New Task">
          <Button
            onClick={() => setIsVisible(true)}
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
          />
        </Tooltip>
      </Typography>
      <Tabs>
        <TabPane tab="Active" key="1">
          {pendingTasks ? (
            pendingTasks.map((task, index) => (
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <CheckOutlined
                    onClick={() => markTaskCompleted(task)}
                    key="setting"
                  />,
                  <Tag color="purple">
                    {moment(task.deadline).format("LTS")}
                  </Tag>,
                  <Tag color="red">
                    {moment(task.deadline).endOf("day").fromNow()}
                  </Tag>,
                ]}
                key={index}
              >
                <Collapse ghost>
                  <Panel header={task.title} key="1">
                    <p>{task.description}</p>
                  </Panel>
                </Collapse>
              </Card>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>

        <TabPane tab="Finished" key="2">
          {finishedTasks ? (
            finishedTasks.map((task, index) => (
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <Tag color="purple">
                    {moment(task.delivery).format("MMMM Do YYYY, h:mm:ss a")}
                  </Tag>,
                ]}
                key={index}
              >
                <Collapse ghost>
                  <Panel header={task.title} key="1">
                    <p>{task.description}</p>
                  </Panel>
                </Collapse>
              </Card>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TasksPanel;
