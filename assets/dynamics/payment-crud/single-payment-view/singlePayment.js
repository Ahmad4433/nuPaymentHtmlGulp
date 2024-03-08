const table = document.getElementById("paymantListTable");
table.addEventListener("click", async (event) => {
  if (event.target.classList.contains("viewBtn")) {
    const invoiceId = event.target.getAttribute("inv");
    console.log(invoiceId);

    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/single/id",
        {
          method: "POST",
          body: JSON.stringify({ id: invoiceId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
        const generatedLink = `https://nu-payments-client.vercel.app/payment/approve?id=${invoiceId}`;

        const userEmailEle = document.getElementById("paymentDetailEmail");
        const detailModelBtn = document.getElementById("detailModelOpner"); //detail model opner button
        const dateEle = document.getElementById("paymentDetailDate");
        const DetailNoteEle = document.getElementById("paymentDetailNote");
        const amountEle = document.getElementById("paymentDetailAmount");
        const currencyEle = document.getElementById("paymentDetailCurrency");
        const qrImageEle = document.getElementById("paymentDetailQr");
        const userImageEle = document.getElementById("paymentDetailUserImage");
        const detailLink = document.getElementById("paymentDetailLink");

        userEmailEle.textContent = resData.payment?.detail.name;
        dateEle.textContent = new Date(
          resData.payment?.createdAt
        ).toLocaleString();
        DetailNoteEle.textContent = resData.payment?.detail.description;
        amountEle.textContent = resData.payment?.detail.amount;
        currencyEle.textContent = resData.payment?.detail.method;
        userImageEle.src = resData?.image;
        detailModelBtn.click();
        //bydefault edit and send buttons will remain disabled
        //disable the edit and send payment button here
        const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
        const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
        sendPaymentButton.disabled = true; //disable send payment button after success
        PaymentEditBtn.disabled = true; //disable edit button after success
        // check if the payment isDone is not true then fill out the links
        if (resData.payment?.isDone !== "true") {
   
          
          qrImageEle.src = `https://quickchart.io/qr?text=${generatedLink}&size=400`;
          detailLink.textContent = generatedLink;

          // active the copy link button here
          const copyBtn = document.getElementById("paymentDetailLinkCopyBtn");
          copyBtn.addEventListener("click", async () => {
            navigator.clipboard
              .writeText(generatedLink)
              .then(() => {
                console.log("URL copied to clipboard successfully");
              })
              .catch((err) => {
                console.error("Error copying URL to clipboard:", err);
              });
          });


          const shareOpenBtn = document.querySelectorAll('#paymentDetailShareIcon')
          Array.from(shareOpenBtn).forEach((ele) => {

            ele.addEventListener('click', async () => {
               
                if (navigator.share) {
                    await navigator.share({
                        title: 'payment link',
                        url: generatedLink,
                        text: 'payment'
                    });
                }
            });
            });





          //enable edit and send button to update payment
          const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
          const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
          const sendPaymentBtn = document.getElementById("addNewMember");
          // const sendPaymentButton = document.getElementById('sendPaymentLink')
          // sendPaymentButton.disabled = false; //enable send payment button after success
          PaymentEditBtn.disabled = false; //enable edit button after success

          PaymentEditBtn.addEventListener("click", async () => {
            const name = (document.getElementById("sendPaymentUsers").value =
              resData.payment?.detail.name); //render all users by select
            const description = (document.getElementById(
              "paymentdetails"
            ).value = resData.payment?.detail.description);
            const amount = (document.getElementById("amount").value =
              resData.payment?.detail.amount);
            const method = (document.getElementById("sendPaymentMethod").value =
              resData.payment?.detail.method);
            const status = (document.getElementById("sendPaymentStatus").value =
              resData.payment?.detail.status);
          });

          let data;

          // this button for moving from add payment model to payment detail model
          sendPaymentBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const name = document.getElementById("sendPaymentUsers"); //render all users by select
            const description = document.getElementById("paymentdetails");
            const amount = document.getElementById("amount");
            const method = document.getElementById("sendPaymentMethod");
            const status = document.getElementById("sendPaymentStatus");
            data = {
              name: name.value,
              description: description.value,
              amount: amount.value,
              method: method.value,
              status: status.value,
            };
            sendPaymentButton.disabled = false; //enable send payment button after success
            await localStorage.setItem("method", "PUT");
            await localStorage.setItem("payId", invoiceId);
          });
        } //end if block

        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete a single payment

  if (event.target.classList.contains("deleteBtn")) {
    const payId = event.target.getAttribute("inv");
    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/delete",
        {
          method: "DELETE",
          body: JSON.stringify({ payId: payId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
       
      }
    } catch (error) {
      console.log(error);
    }
  }
});
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/// same above for payment send table
const senadPaymentTable = document.getElementById('paymentTablePending')

senadPaymentTable.addEventListener("click", async (event) => {
  if (event.target.classList.contains("viewBtn")) {
    const invoiceId = event.target.getAttribute("inv");
    console.log(invoiceId);

    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/single/id",
        {
          method: "POST",
          body: JSON.stringify({ id: invoiceId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
        const generatedLink = `https://nu-payments-client.vercel.app/payment/approve?id=${invoiceId}`;

        const userEmailEle = document.getElementById("paymentDetailEmail");
        const detailModelBtn = document.getElementById("detailModelOpner"); //detail model opner button
        const dateEle = document.getElementById("paymentDetailDate");
        const DetailNoteEle = document.getElementById("paymentDetailNote");
        const amountEle = document.getElementById("paymentDetailAmount");
        const currencyEle = document.getElementById("paymentDetailCurrency");
        const qrImageEle = document.getElementById("paymentDetailQr");
        const userImageEle = document.getElementById("paymentDetailUserImage");
        const detailLink = document.getElementById("paymentDetailLink");

        userEmailEle.textContent = resData.payment?.detail.name;
        dateEle.textContent = new Date(
          resData.payment?.createdAt
        ).toLocaleString();
        DetailNoteEle.textContent = resData.payment?.detail.description;
        amountEle.textContent = resData.payment?.detail.amount;
        currencyEle.textContent = resData.payment?.detail.method;
        userImageEle.src = resData?.image;
        detailModelBtn.click();
        //bydefault edit and send buttons will remain disabled
        //disable the edit and send payment button here
        const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
        const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
        sendPaymentButton.disabled = true; //disable send payment button after success
        PaymentEditBtn.disabled = true; //disable edit button after success
        // check if the payment isDone is not true then fill out the links
        if (resData.payment?.isDone !== "true") {
   
          
          qrImageEle.src = `https://quickchart.io/qr?text=${generatedLink}&size=400`;
          detailLink.textContent = generatedLink;

          // active the copy link button here
          const copyBtn = document.getElementById("paymentDetailLinkCopyBtn");
          copyBtn.addEventListener("click", async () => {
            navigator.clipboard
              .writeText(generatedLink)
              .then(() => {
                console.log("URL copied to clipboard successfully");
              })
              .catch((err) => {
                console.error("Error copying URL to clipboard:", err);
              });
          });


          const shareOpenBtn = document.querySelectorAll('#paymentDetailShareIcon')
          Array.from(shareOpenBtn).forEach((ele) => {

            ele.addEventListener('click', async () => {
               
                if (navigator.share) {
                    await navigator.share({
                        title: 'payment link',
                        url: generatedLink,
                        text: 'payment'
                    });
                }
            });
            });





          //enable edit and send button to update payment
          const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
          const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
          const sendPaymentBtn = document.getElementById("addNewMember");
          // const sendPaymentButton = document.getElementById('sendPaymentLink')
          // sendPaymentButton.disabled = false; //enable send payment button after success
          PaymentEditBtn.disabled = false; //enable edit button after success

          PaymentEditBtn.addEventListener("click", async () => {
            const name = (document.getElementById("sendPaymentUsers").value =
              resData.payment?.detail.name); //render all users by select
            const description = (document.getElementById(
              "paymentdetails"
            ).value = resData.payment?.detail.description);
            const amount = (document.getElementById("amount").value =
              resData.payment?.detail.amount);
            const method = (document.getElementById("sendPaymentMethod").value =
              resData.payment?.detail.method);
            const status = (document.getElementById("sendPaymentStatus").value =
              resData.payment?.detail.status);
          });

          let data;

          // this button for moving from add payment model to payment detail model
          sendPaymentBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const name = document.getElementById("sendPaymentUsers"); //render all users by select
            const description = document.getElementById("paymentdetails");
            const amount = document.getElementById("amount");
            const method = document.getElementById("sendPaymentMethod");
            const status = document.getElementById("sendPaymentStatus");
            data = {
              name: name.value,
              description: description.value,
              amount: amount.value,
              method: method.value,
              status: status.value,
            };
            sendPaymentButton.disabled = false; //enable send payment button after success
            await localStorage.setItem("method", "PUT");
            await localStorage.setItem("payId", invoiceId);
          });
        } //end if block

        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete a single payment

  if (event.target.classList.contains("deleteBtn")) {
    const payId = event.target.getAttribute("inv");
    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/delete",
        {
          method: "DELETE",
          body: JSON.stringify({ payId: payId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
       
      }
    } catch (error) {
      console.log(error);
    }
  }
});




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//same above for received tabel
const paidTable = document.getElementById("paymentTabelPaid");
paidTable.addEventListener("click", async (event) => {
  if (event.target.classList.contains("viewBtn")) {
    const invoiceId = event.target.getAttribute("inv");
    console.log(invoiceId);

    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/single/id",
        {
          method: "POST",
          body: JSON.stringify({ id: invoiceId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
        const generatedLink = `https://nu-payments-client.vercel.app/payment/approve?id=${invoiceId}`;

        const userEmailEle = document.getElementById("paymentDetailEmail");
        const detailModelBtn = document.getElementById("detailModelOpner"); //detail model opner button
        const dateEle = document.getElementById("paymentDetailDate");
        const DetailNoteEle = document.getElementById("paymentDetailNote");
        const amountEle = document.getElementById("paymentDetailAmount");
        const currencyEle = document.getElementById("paymentDetailCurrency");
        const qrImageEle = document.getElementById("paymentDetailQr");
        const userImageEle = document.getElementById("paymentDetailUserImage");
        const detailLink = document.getElementById("paymentDetailLink");

        userEmailEle.textContent = resData.payment?.detail.name;
        dateEle.textContent = new Date(
          resData.payment?.createdAt
        ).toLocaleString();
        DetailNoteEle.textContent = resData.payment?.detail.description;
        amountEle.textContent = resData.payment?.detail.amount;
        currencyEle.textContent = resData.payment?.detail.method;
        userImageEle.src = resData?.image;
        detailModelBtn.click();
        //bydefault edit and send buttons will remain disabled
        //disable the edit and send payment button here
        const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
        const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
        sendPaymentButton.disabled = true; //disable send payment button after success
        PaymentEditBtn.disabled = true; //disable edit button after success
        // check if the payment isDone is not true then fill out the links
        if (resData.payment?.isDone !== "true") {
   
          
          qrImageEle.src = `https://quickchart.io/qr?text=${generatedLink}&size=400`;
          detailLink.textContent = generatedLink;

          // active the copy link button here
          const copyBtn = document.getElementById("paymentDetailLinkCopyBtn");
          copyBtn.addEventListener("click", async () => {
            navigator.clipboard
              .writeText(generatedLink)
              .then(() => {
                console.log("URL copied to clipboard successfully");
              })
              .catch((err) => {
                console.error("Error copying URL to clipboard:", err);
              });
          });


          const shareOpenBtn = document.querySelectorAll('#paymentDetailShareIcon')
          Array.from(shareOpenBtn).forEach((ele) => {

            ele.addEventListener('click', async () => {
               
                if (navigator.share) {
                    await navigator.share({
                        title: 'payment link',
                        url: generatedLink,
                        text: 'payment'
                    });
                }
            });
            });





          //enable edit and send button to update payment
          const sendPaymentButton = document.getElementById("sendPaymentLink"); // button to send a payment request from payment detail model
          const PaymentEditBtn = document.getElementById("EditPaymentLink"); //edit payment button from qr model
          const sendPaymentBtn = document.getElementById("addNewMember");
          // const sendPaymentButton = document.getElementById('sendPaymentLink')
          // sendPaymentButton.disabled = false; //enable send payment button after success
          PaymentEditBtn.disabled = false; //enable edit button after success

          PaymentEditBtn.addEventListener("click", async () => {
            const name = (document.getElementById("sendPaymentUsers").value =
              resData.payment?.detail.name); //render all users by select
            const description = (document.getElementById(
              "paymentdetails"
            ).value = resData.payment?.detail.description);
            const amount = (document.getElementById("amount").value =
              resData.payment?.detail.amount);
            const method = (document.getElementById("sendPaymentMethod").value =
              resData.payment?.detail.method);
            const status = (document.getElementById("sendPaymentStatus").value =
              resData.payment?.detail.status);
          });

          let data;

          // this button for moving from add payment model to payment detail model
          sendPaymentBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const name = document.getElementById("sendPaymentUsers"); //render all users by select
            const description = document.getElementById("paymentdetails");
            const amount = document.getElementById("amount");
            const method = document.getElementById("sendPaymentMethod");
            const status = document.getElementById("sendPaymentStatus");
            data = {
              name: name.value,
              description: description.value,
              amount: amount.value,
              method: method.value,
              status: status.value,
            };
            sendPaymentButton.disabled = false; //enable send payment button after success
            await localStorage.setItem("method", "PUT");
            await localStorage.setItem("payId", invoiceId);
          });
        } //end if block

        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //delete a single payment

  if (event.target.classList.contains("deleteBtn")) {
    const payId = event.target.getAttribute("inv");
    try {
      const response = await fetch(
        "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/delete",
        {
          method: "DELETE",
          body: JSON.stringify({ payId: payId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      } else {
       
      }
    } catch (error) {
      console.log(error);
    }
  }
});

