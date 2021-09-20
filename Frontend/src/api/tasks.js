import { basePath, apiVersion } from "./config";

export function getTasksApi(token, data) {
  let url = `${basePath}/${apiVersion}/tasks?`;
  url += `date=${data}`;

  const params = {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function setTasksCompletedApi(token, id) {
  const url = `${basePath}/${apiVersion}/tasks/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getAllTasksCompletedApi(token) {
  const url = `${basePath}/${apiVersion}/tasks-completed`;
  const params = {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function createTasksApi(token, data) {
  const url = `${basePath}/${apiVersion}/tasks`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.task) {
        return {
          ok: true,
          message: "Tarea creada!!!",
        };
      }
      return {
        ok: false,
        message: result.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      };
    });
}

export function countAllTasksCompletedApi(token, data) {
  let url = `${basePath}/${apiVersion}/done-tasks`;

  const params = {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function countAllPendingTasksApi(token, data) {
  let url = `${basePath}/${apiVersion}/pending-tasks`;

  const params = {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function countAllLateTasksApi(token, data) {
  let url = `${basePath}/${apiVersion}/late-tasks`;

  const params = {
    method: "GET",
    // body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}