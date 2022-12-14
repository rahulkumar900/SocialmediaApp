const create = async (user) => {
  console.log(user);
  try {
    let response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const list = async (signal) => {
  try {
    let response = await fetch("http://localhost:8080/api/user", {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const read = async (params, signal) => {
  const id = params.userId;
  try {
    let response = await fetch(`http://localhost:8080/api/user/${id}`, {
      method: "GET",
      signal: signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const update = async (data, params) => {
  console.log(data);
  console.log(params);

  try {
    let response = await fetch("/api/user/" + params, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update };
