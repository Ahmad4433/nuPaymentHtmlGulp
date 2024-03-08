const productList = async () => {
    const live  ='https://newapp--4-f1f2be6aa8d1.herokuapp.com/'


  try {
    const response = await fetch(`${live}product/list`, {
      method: "POST",
      body:JSON.stringify({userId:localStorage.getItem('userId')}),
      headers: { "Content-Type": "application/json" },
    });
    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      console.log(resData);
      updateList(resData);
    }
  } catch (error) {
    console.log(error);
  }
};

productList();

function updateList(data) {
  const table = document.getElementById("productListTable");

  const newList =
    data &&
    data.list.map((pro, index) => {
        const live  ='https://newapp--4-f1f2be6aa8d1.herokuapp.com/'
      const local = "http://localhost:8000/";
      return `
        
        <tr key=${index}>
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="check1" value="option">
            </div>
        </td>
        <td>
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3 avatar-sm">
                    <div class="avatar-title bg-light rounded"> <img
                            src=${pro.image} alt=""
                            class="avatar-xs"> </div>
                </div>
                <div class="flex-grow-1">
                    <h6 class="fs-16 mb-1">${pro.name}</h6>
                </div>
            </div>
        </td>
        <td>${pro.category}</td>
        <td>65 / 125</td>
        <td>
            <span class="badge bg-light text-body fs-12 fw-medium"><i class="mdi mdi-star text-warning me-1"></i>3.9</span>
        </td>
        <td><div>$${pro.price}</div></td>
        <td>
            <div class="dropdown">
                <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="las la-ellipsis-h align-middle fs-18"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <button proId=${pro._id} class="dropdown-item viewBtn" href="javascript:void(0);"><i class="las la-eye fs-18 align-middle me-2 text-muted"></i>
                            View</button>
                    </li>
                
                    <li>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                            Download</a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li>

                    <button proId=${pro._id} class="dropdown-item deleteBtn" href="javascript:void(0);">  <i class="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                    Delete</button>

                      
                    </li>
                </ul>
            </div>
        </td>
    </tr>


        `;
    });

  table.innerHTML = newList;
}
