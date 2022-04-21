let darkFlag = false;
function getTime() {
  const nowDate = new Date();
  time = nowDate.toLocaleTimeString();
  const Container = document.querySelector(".Container");
  Container.classList.add("AlertContainer");
  Container.innerHTML = "";
  const curTime = document.createElement("div");
  curTime.innerText = time;
  curTime.classList.add("Card");
  const ifSettedTime = TimeInputElement.value;
  const finDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    ifSettedTime === undefined || ifSettedTime === null
      ? 18
      : ifSettedTime.substring(0, 2),
    ifSettedTime === undefined || ifSettedTime === null
      ? 00
      : ifSettedTime.substring(3),
    00
  );
  if (finDate < nowDate) {
    darkFlag = true;
    const curDiff = nowDate - finDate;
    const diffHour = String(
      Math.floor((curDiff / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const diffMin = String(Math.floor((curDiff / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const diffSec = String(Math.floor((curDiff / 1000) % 60)).padStart(2, "0");
    const leftWorkStr = `${diffHour}:${diffMin}:${diffSec} 더 일하고 있습니다.`;

    const LeftWorkTime = document.querySelector(".LeftWorkTime");
    if (LeftWorkTime === null) {
      const NewLeftWorkTime = document.createElement("div");
      NewLeftWorkTime.classList.add("LeftWorkTime");
      NewLeftWorkTime.innerText = leftWorkStr;
      App.appendChild(NewLeftWorkTime);
    } else {
      LeftWorkTime.innerText = leftWorkStr;
    }
  } else {
    darkFlag = false;
    const LeftWorkTIme = document.querySelector(".LeftWorkTime");
    if (LeftWorkTIme !== null) App.removeChild(LeftWorkTIme);
  }
  const diff =
    finDate > nowDate
      ? finDate - nowDate
      : new Date(
          finDate.getFullYear(),
          finDate.getMonth(),
          finDate.getDate() + 1,
          finDate.getHours(),
          finDate.getMinutes(),
          finDate.getSeconds()
        ) - nowDate;
  const diffHour = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const diffMin = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const diffSec = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  const leftTimeStr = `${diffHour}:${diffMin}:${diffSec} 남았습니다`;
  const leftTime = document.createElement("div");
  leftTime.innerText = leftTimeStr;
  leftTime.classList.add("Card");
  if (parseInt(diffHour) < 1) {
    if (parseInt(diffMin) < 30) {
      if (App.classList.contains("AlertAppBackGround"))
        App.classList.remove("AlertAppBackGround");
    } else {
      App.classList.toggle("DefaultAppBackGround");
      App.classList.toggle("AlertAppBackGround");
    }
    if (diffSec === "00" && Notification.permission === "granted") {
      const notification = new Notification("알람", {
        body: `${diffMin}분 남았습니다.`,
        icon: "./resources/installer/Icon.ico",
      });
    }
  } else {
    if (App.classList.contains("AlertAppBackGround"))
      App.classList.remove("AlertAppBackGround");
  }
  const Title = document.createElement("div");
  Title.innerText = "남은 시간 알려줘";
  Container.appendChild(Title);
  Container.appendChild(leftTime);
  Container.appendChild(curTime);
}
setInterval(getTime, 1000);

const App = document.querySelector(".App");

App.classList.add("DefaultAppBackGround");

function setDarkBackground() {
  if (App.classList.contains("DefaultAppBackGround"))
    App.classList.toggle("DefaultAppBackGround");
  if (App.classList.contains("DangerAppBackGround"))
    App.classList.toggle("DangerAppBackGround");
  if (!App.classList.contains("DarkAppBackGround"))
    App.classList.toggle("DarkAppBackGround");
}

function setDangerBackGround() {
  if (darkFlag) {
    setDarkBackground();
    return;
  } else {
    if (App.classList.contains("DarkAppBackGround"))
      App.classList.toggle("DarkAppBackGround");
  }

  const nowDate = new Date();
  const ifSettedTime = TimeInputElement.value;
  console.log(ifSettedTime);
  const finDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    ifSettedTime === undefined || ifSettedTime === null
      ? 18
      : ifSettedTime.substring(0, 2),
    ifSettedTime === undefined || ifSettedTime === null
      ? 00
      : ifSettedTime.substring(3),
    00
  );
  const diff = finDate - nowDate;
  const diffHour = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const diffMin = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  console.log(diffMin, diffHour);
  if (parseInt(diffMin) < 30 && parseInt(diffHour) < 1) {
    App.classList.toggle("DefaultAppBackGround");
    App.classList.toggle("DangerAppBackGround");
  } else {
    if (App.classList.contains("DangerAppBackGround"))
      App.classList.remove("DangerAppBackGround");
  }
}

setInterval(setDangerBackGround, 500);

const Controller = document.querySelector(".Controller");

function controllerInit() {
  const hourList = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteList = Array.from({ length: 60 }, (_, i) => i + 1);
  const TimeInput = document.createElement("input");
  TimeInput.type = "time";
  TimeInput.value = "18:00";

  const Title = document.createElement("div");
  Title.classList.add("Title");
  Title.innerText = "퇴근시간";

  Controller.appendChild(Title);
  Controller.appendChild(TimeInput);
  return TimeInput;
}

const TimeInputElement = controllerInit();

Notification.requestPermission((permission) => {
  if (permission === "granted") {
    const notification = new Notification("Hello");
  }
});
