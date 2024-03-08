async function updatenotification() {
  const name = await localStorage.getItem("name");

  try {
    const response = await fetch(
      "https://newapp--4-f1f2be6aa8d1.herokuapp.com/payment/notification",
      {
        method: "POST",
        body: JSON.stringify({ userName: name }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const resData = await response.json();
    if (!response.ok) {
      console.log(resData.message);
    } else {
      const count = document.querySelectorAll(
        "#notificationCount,#notificationBadge"
      );

      Array.from(count).forEach((ele) => {
        ele.textContent =
          resData?.findedPayments.length > 0
            ? resData.findedPayments.length
            : "";
      });

      const notificationsContainer = document.getElementById("notifications");

      const notify = resData?.findedPayments?.map((pay, index) => {
        const generatedLink = `https://nu-payments-client.vercel.app/payment/approve?id=${pay._id}`;

        return `
     
        <div class="d-flex">
        <div class="avatar-xs me-3">
          <span
            class="avatar-title bg-info-subtle text-info text-info rounded-circle fs-16"
          >
            <i class="bx bx-badge-check"></i>
          </span>
        </div>
        <div class="flex-1">
          <a href=${generatedLink} class="stretched-link">
            <h6 class="mt-0 fs-14 mb-2 lh-base">
              a new Payment request  <breceived</b> from 
              <span class="text-secondary">${pay.detail.name}</span> 
            </h6>
          </a>
          <p
            class="mb-0 fs-11 fw-medium text-uppercase text-muted"
          >
            <span
              ><i class="mdi mdi-clock-outline"></i> Just 30 sec
              ago</span
            >
          </p>
        </div>
        <div class="px-2 fs-15">
          <div class="form-check notification-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="all-notification-check01"
            />
            <label
              class="form-check-label"
              for="all-notification-check01"
            ></label>
          </div>
        </div>
      </div>

          `;
      });
      notificationsContainer.innerHTML = notify;
    }
  } catch (error) {
    console.log(error);
  }
}
updatenotification();
