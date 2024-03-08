const activeFile = document.querySelector(".dropzone");
const fileImage = document.querySelector(".productImageFile"); // input that store seleted file
const productImagePreview = document.getElementById("productImagePreview"); // image preview container
const imagePreview = document.getElementById("productImgePreview"); // image preview img tag
const selectedImagePreviewList = document.getElementById("dropzone-preview"); // ul for all selected images
const seletecProImgDeleteBtn = document.getElementById(
  "selectedProductImgDeleteBtn"
); // button to delete selected product image
let image ;




activeFile.addEventListener("click", () => {
  fileImage.click();
});

// get seletd image from input

fileImage.addEventListener('change',(event)=>{

image = event.target.files[0]

})


// to render the selected file on screen
fileImage.addEventListener("change", (event) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const generatedLink = event.target.result;
    imagePreview.src = generatedLink;
  };

  reader.readAsDataURL(event.target.files[0]);
  selectedImagePreviewList.style.display = "block";
});

// to delete the selected file
seletecProImgDeleteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  selectedImagePreviewList.style.display = "none";
  fileImage.click();
  
});

const saveBtn = document.getElementById("saveproduct");
saveBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const proMethod = await localStorage.getItem("proMethod");
  if (proMethod === "PUT") {
    await updatePro();
  } else {
    await addProduct();
  }
});

// add product gose here

async function addProduct() {

console.log(image)

  const live = "https://newapp--4-f1f2be6aa8d1.herokuapp.com/";
  const userId = localStorage.getItem("userId");
  const productName = document.getElementById("productname");
  const file = document.querySelector(".productImageFile");
  const productBrnd = document.getElementById("brand");
  const price = document.getElementById("price");
  const category = document.getElementById("choices-single-category");
  const specification = document.getElementById(
    "choices-single-specifications"
  );
  const description = document.getElementById("productdesc");

  const data = {
    name: productName.value,
    brand: productBrnd.value,
    price: price.value,
    category: category.value,
    specification: specification.value,
    description: description.value,
  };

  if (
    !productName.value ||
    !image ||
    image === 'null'||
    !productBrnd.value ||
    !price.value ||
    !category.value ||
    !specification.value ||
    !description.value
  ) {
    console.log("please complete the form");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out all the fields!",
    });

    return;
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", data.name);
  formData.append("userId", userId);
  formData.append("brand", data.brand);
  formData.append("price", data.price);
  formData.append("specification", data.specification);
  formData.append("category", data.category);
  formData.append("description", data.description);

  const response = await fetch(`${live}product/add`, {
    method: "POST",
    body: formData,
  });

  const resData = await response.json();

  if (!response.ok) {
    console.log(resData.message);
  } else {
    console.log(resData);

    window.location.href = "/product-list.html";
    localStorage.removeItem('proMethod')
    localStorage.removeItem("singlePro");
  }
}

//update product gose here
async function updatePro() {
  try {
    const productName = document.getElementById("productname");
    const file = document.querySelector(".productImageFile");
    const productBrnd = document.getElementById("brand");
    const price = document.getElementById("price");
    const category = document.getElementById("choices-single-category");
    const specification = document.getElementById(
      "choices-single-specifications"
    );
    const description = document.getElementById("productdesc");

    const data = {
      name: productName.value,
      image: file.files[0],
      brand: productBrnd.value,
      price: price.value,
      category: category.value,
      specification: specification.value,
      description: description.value,
    };
    // const userId = localStorage.getItem("userId");
    const prodata = JSON.parse(localStorage.getItem("singlePro"));
    const proId = prodata.singlePro[0]._id;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("proId", proId);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("specification", data.specification);
    formData.append("category", data.category);
    formData.append("description", data.description);

    const live = "https://newapp--4-f1f2be6aa8d1.herokuapp.com/";

    const response = await fetch(`${live}product/update`, {
      method: "PUT",
      body: formData,
    });

    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      console.log(resData);
      window.location.href = "/product-list.html";
      localStorage.removeItem('proMethod')
      localStorage.removeItem("singlePro");
    }
  } catch (error) {
    console.log(error);
  }
}
