const formAdd = document.querySelector(".add-participants");
const formUpdate = document.querySelector(".update-participants");
const plist = document.querySelector(".participants-list");
const participantsList = document.querySelector(".participants-list");
const deleteBtn = document.querySelector(".delete-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const url = "http://localhost:4000/participants";

//Get Participants
const getParticipants = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

getParticipants()
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.setAttribute("id", data[i]._id);
      li.textContent = data[i].name + "-" + data[i].age + "-" + data[i].phone;
      participantsList.append(li);
    }
  })
  .catch((err) => console.log(err));

//Add new Participants
const addParticipants = async (name, age, phone) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      age: age,
      phone: phone,
    }),
  });

  if (response.status != 200) {
    throw new Error("Server did not accept the request!");
  }
  const data = await response.json();
  return data;
};

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  addParticipants(formAdd.name.value, formAdd.age.value, formAdd.phone.value)
    .then((response) => {
      console.log(response.status);
      location.reload();
    })
    .catch((err) => {
      console.log("Error Adding new participant: ", err.message);
    });
});

//Update Participants

plist.addEventListener("click", (e) => {
  formAdd.classList.add("d-none");
  formUpdate.classList.remove("d-none");
  const data = e.target.textContent.split(/-/);
  formUpdate.name.value = data[0];
  formUpdate.age.value = data[1];
  formUpdate.phone.value = data[2];
  formUpdate.id = e.target.id;
  deleteBtn.id = e.target.id;
});

//Add new Participants
const updateParticipant = async (id, name, age, phone) => {
  const response = await fetch(url + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      age: age,
      phone: phone,
    }),
  });

  if (response.status != 200) {
    throw new Error("Server did not accept the request!");
  }
  const data = await response.json();
  return data;
};

formUpdate.addEventListener("submit", (e) => {
  e.preventDefault();
  formAdd.classList.remove("d-none");
  formUpdate.classList.add("d-none");
  updateParticipant(formUpdate.id, formUpdate.name.value, formUpdate.age.value, formUpdate.phone.value)
    .then((response) => {
      console.log(response.status);
      location.reload();
      formUpdate.id = null;
    })
    .catch((err) => {
      console.log("Error Adding new participant: ", err.message);
    });
});

//Delete Participants

const deleteParticipant = async (id) => {
  const response = await fetch(url + "/" + id, {
    method: "DELETE",
  });
  if (response.status != 200) {
    throw new Error("Server did not accept the request!");
  }
  const data = await response.json();
  return data;
};

deleteBtn.addEventListener("click", (e) => {
  formAdd.classList.remove("d-none");
  formUpdate.classList.add("d-none");

  deleteParticipant(deleteBtn.id)
    .then((response) => {
      console.log(response.status);
      location.reload();
      deleteBtn.id = null;
    })
    .catch((err) => {
      console.log("Error Adding new participant: ", err.message);
    });
});

//Cancel Button
cancelBtn.addEventListener("click", (e) => {
  formAdd.classList.remove("d-none");
  formUpdate.classList.add("d-none");
});
