const updatePaymentTable = async () => {
  const getData = async () => {
    const live = "https://newapp--4-f1f2be6aa8d1.herokuapp.com/";
    const response = await fetch(`${live}payment/list`, {
      method: "POST",
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
      headers: { "Content-Type": "application/json" },
    });

    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      console.log(resData);
      const table = document.getElementById("paymantListTable");
      // payment table status panding data
      const pendingData = document.getElementById("paymentTablePending");
      const tableData = resData.payment?.map((payment2, index) => {
        return `
        
        <tr key=${index} >
        <td>
        <a href="#javascript: void(0);" class="text-body align-middle fw-medium">${
          payment2.detail?.name
        }</a>

        </td>
        <td>${new Date(payment2.createdAt).toLocaleString()}</td>
        <td>${payment2.detail?.description}</td>
      
        <td>
        
        <img src="${
          payment2?.currnecyImg
        }" class="rounded" style="width: 24px; height: 24px;" alt="Currency Image">
        ${payment2.detail?.method}</td>
        <td>${payment2.detail?.amount}</td>
        <td><span class="badge bg-success-subtle text-success p-2">${
          payment2.detail?.status
        }</span></td>
        <td>
            <div class="dropdown">
                <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="las la-ellipsis-h align-middle fs-18"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <button  inv=${
                          payment2?._id
                        } class="dropdown-item viewBtn" href="javascript:void(0);"><i class="las la-eye fs-18 align-middle me-2 text-muted"></i>
                            View</button>
                    </li>
                               <li>
                    <button inv=${
                      payment2?._id
                    } class="dropdown-item deleteBtn" href="javascript:void(0);"> <i class="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                        Delete</button>
                </li>
                    <li>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                            Download</a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <
                </ul>
            </div>
        </td>
    </tr>

        
        
        `;
      });

      table.innerHTML = tableData;

      const pendingStatus = await resData?.payment.filter(
        (payment) => payment.detail.status === "Send"
      );

      const pending = pendingStatus.map((data, index) => {
        return `
        
        <tr key=${index} >
        <td>
            <a href="#javascript: void(0);" class="text-body align-middle fw-medium">${
              data.detail?.name
            }</a>
        </td>
        <td>${new Date(data.createdAt).toLocaleString()}</td>
        <td>${data.detail?.description}</td>
        <td>
        
        <img src="${
          data?.currnecyImg
        }" class="rounded" style="width: 24px; height: 24px;" alt="Currency Image">
        ${data.detail?.method}</td>
        <td>${data.detail?.amount}</td>
        <td><span class="badge bg-success-subtle text-success p-2">${
          data.detail?.status
        }</span></td>
        <td>
            <div class="dropdown">
                <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="las la-ellipsis-h align-middle fs-18"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <button inv=${
                          data?._id
                        } class="dropdown-item viewBtn" href="javascript:void(0);"><i class="las la-eye fs-18 align-middle me-2 text-muted"></i>
                            View</button>
                    </li>
                    <li>
                        <button inv=${
                          data?._id
                        } class="dropdown-item deleteBtn" href="javascript:void(0);"> <i class="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                            Delete</button>
                    </li>
                    <li>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                            Download</a>
                    </li>
                    <li class="dropdown-divider"></li>
                    
                </ul>
            </div>
        </td>
    </tr>

        
        
        
        
        `;
      });

      pendingData.innerHTML = pending;

      const paidTable = document.getElementById("paymentTabelPaid");

      const paisStatus = resData?.payment.filter(
        (payment) => payment.detail.status === "Receive"
      );
      const paid = paisStatus.map((data, index) => {
        return `
    
    <tr>
    <td>
        <a href="#javascript: void(0);" class="text-body align-middle fw-medium">${
          data.detail.name
        }</a>
    </td>
    <td>${new Date(data.createdAt).toLocaleString()}</td>
    <td>${data.detail?.description}</td>
    <td>
    
    <img src="${
      data?.currnecyImg
    }" class="rounded" style="width: 24px; height: 24px;" alt="Currency Image">
    ${data.detail?.method}</td>
    <td>${data.detail?.amount}</td>
    <td><span class="badge bg-warning-subtle text-warning p-2">${
      data.detail?.status
    }</span></td>
    <td>
        <div class="dropdown">
            <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="las la-ellipsis-h align-middle fs-18"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <button inv=${
                      data?._id
                    } class="dropdown-item viewBtn" href="javascript:void(0);"><i class="las la-eye fs-18 align-middle me-2 text-muted"></i>
                        View</button>
                </li>
                <li>
                <button inv=${
                  data?._id
                } class="dropdown-item deleteBtn" href="javascript:void(0);"> <i class="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                    Delete</button>
            </li>
                <li>
                    <a class="dropdown-item" href="javascript:void(0);"><i class="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                        Download</a>
                </li>
                <li class="dropdown-divider"></li>
             
            </ul>
        </div>
    </td>
</tr>
    
    
    `;
      });

      paidTable.innerHTML = paid;
    }
  };

  await getData();
};

updatePaymentTable();
