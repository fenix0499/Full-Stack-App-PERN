import React, { useState } from "react";
import {
  Modal as ModalAntd,
  Input,
  Form,
  Button,
  DatePicker,
  TimePicker,
  notification,
} from "antd";

import { createTasksApi } from "../api/tasks";

import moment from "moment";

export default function AddTaskModal(props) {
  const { isVisible, setIsVisible, token, setReloadData } = props;

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const createTask = async () => {
    try {
      let result = await createTasksApi(token, inputs);
      if (result.ok) {
        notification["success"]({
          message: result.message,
        });
        setReloadData(true);
        setIsVisible(false);
        setInputs({
          title: "",
          description: "",
          date: "",
          time: "",
        });
      } else {
        notification["error"]({
          message: result.message,
        });
      }
    } catch (ex) {}
  };

  return (
    <ModalAntd
      title="Create a Task"
      centered
      visible={isVisible}
      onCancel={() => {
        setIsVisible(false);
        setInputs({
          title: "",
          description: "",
          date: "",
          time: "",
        });
      }}
      footer={false}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Title">
          <Input
            name="title"
            placeholder="Title"
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input
            name="description"
            placeholder="Description"
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            value={inputs.description}
          />
        </Form.Item>

        <Form.Item valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <DatePicker
            onChange={(e) =>
              setInputs({ ...inputs, date: moment(e).format("DD/MM/yyyy") })
            }
          />
          <TimePicker
            onChange={(e) =>
              setInputs({ ...inputs, time: moment(e).format("HH:mm:ss") })
            }
            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => {
              createTask();
            }}
            type="primary"
          >
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </ModalAntd>
  );
}
