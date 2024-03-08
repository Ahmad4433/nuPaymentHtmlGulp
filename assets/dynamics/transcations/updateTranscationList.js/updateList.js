const local = "http://localhost:8000/transcation/list";
const live = "https://nu-payment-server-web.vercel.app/transcation/list";
const table = document.getElementById('transcationListTable')
const getList = async () => {
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(`${live}`, {
      method: "POST",
      body: JSON.stringify({ userId: userId }),
      headers: { "Content-Type": "application/json" },
    });
    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      console.log(resData);
            updateList(resData?.list?.transcation)
    }
  } catch (error) {
    console.log(error);
  }
};

getList();



function updateList(data){

const newTable = data?.map((tran,index)=>{

    return `
    
    <tr key=${index} >
    <td>#${tran?._id}</td>
    <td>${new Date(tran?.updatedAt).toLocaleDateString()}</td>
    <td>${tran?.detail}</td>
    <td><span
            class="badge bg-success-subtle text-success  p-2">${tran?.status}</span>
    </td>
    <td>$${tran?.amount}</td>
    <!-- <td>N/A</td> -->
</tr>
    
    
    `

})

table.innerHTML = newTable

}