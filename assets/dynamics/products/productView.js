const productLisTable = document.getElementById("productListTable"); // product list table
live = "https://newapp--4-f1f2be6aa8d1.herokuapp.com";

productLisTable.addEventListener("click", async (event) => {
  if (event.target.classList.contains("viewBtn")) {
    const proId = event.target.getAttribute("proId");

    try {
      const response = await fetch(`${live}/product/single`, {
        method: "POST",
        body: JSON.stringify({ proId: proId }),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
        fillProductModel(resData.filterArray);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (event.target.classList.contains("deleteBtn")) {
   try {
    
    const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/product/delete",
        {
          method: "DELETE",
          body: JSON.stringify({ proId: event.target.getAttribute("proId") }),
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
        console.log(resData);
        window.location.reload()
      }

   } catch (error) {
    console.log(error)
   }
  }
});

function fillProductModel(data) {
  localStorage.setItem("singlePro", JSON.stringify({ singlePro: data }));
  localStorage.setItem("proMethod", "PUT");
  window.location.href = "/product-add.html";
}
