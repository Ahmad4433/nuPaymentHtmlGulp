const live = "https://nu-server3.vercel.app";
const local = "http://localhost:8000";
const addUserBtn = document.getElementById("addNewMember");

const userName = document.getElementById("teammembersName");
const email = document.getElementById("teammembersEmail");
const number = document.getElementById("teammembersnumber");
const userStatus = document.getElementById("addUserStatus");
const image = document.getElementById("member-image-input");

addUserBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const data = {
    name: userName.value,
    email: email.value,
    number: number.value,
    status: userStatus.value,
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  formData.append("image", image.files[0]);
  const resposne = await fetch(`${live}/sales/user/add`, {
    method: "POST",
    body: formData,
  });

  const resData = await resposne.json();
  if (!resposne.ok) {
    console.log(resData.message);
  } else {
    window.location.reload();
    window.location.href = "user.html";
  }
});

const updateUSer = async () => {
  try {
    const response = await fetch(`${local}/admin/user/list`, {
      methodL: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      updateUSerTable(resData?.users);
    }
  } catch (error) {
    console.log(error);
  }
};

updateUSer();

function updateUSerTable(data) {
  const selectedTable = document.getElementById("salesUserTable");

  const newTable = data.map((user, index) => {
    return( `<tr>
        <td>
            <img src="${local}/${user.image}" alt="" class="avatar-xs rounded-circle me-2">
            <a href="#javascript: void(0);" class="text-body align-middle fw-medium">${user.name}</a>
        </td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        <td><span class="badge bg-success-subtle text-success p-2">${user.status}</span></td>
        <td>
            <ul class="list-inline hstack gap-2 mb-0">
                <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                    <a href="" class="btn btn-soft-info btn-sm d-inline-block">
                        <i class="las la-eye fs-17 align-middle"></i>
                    </a>
                </li>
                <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                    <a href="" class="btn btn-soft-info btn-sm d-inline-block">
                        <i class="las la-pen fs-17 align-middle"></i>
                    </a>
                </li>
                <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                    <a href="" class="btn btn-soft-danger btn-sm d-inline-block">
                        <i class="las la-file-download fs-17 align-middle"></i>
                    </a>
                </li>
            </ul>
        </td>
    </tr>`);
});


  selectedTable.innerHTML = newTable;
}
