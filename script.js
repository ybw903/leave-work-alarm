function getTime() {
  const nowDate = new Date();
  time = nowDate.toLocaleTimeString();
  const Container = document.querySelector(".Container");
  Container.classList.add("AlertContainer");
  Container.innerHTML = "";
  const curTime = document.createElement("div");
  curTime.innerText = time;
  curTime.classList.add("Card");
  const finDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    18,
    00,
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
  const diffSec = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  const leftTimeStr = `${diffHour}:${diffMin}:${diffSec} 남았습니다`;
  const leftTime = document.createElement("div");
  leftTime.innerText = leftTimeStr;
  leftTime.classList.add("Card");
  const testDiffMin = diffMin - 10;
  if (parseInt(diffHour) < 1) {
    if (parseInt(testDiffMin) < 30) {
      if (App.classList.contains("AlertAppBackGround"))
        App.classList.remove("AlertAppBackGround");
    } else {
      App.classList.toggle("DefaultAppBackGround");
      App.classList.toggle("AlertAppBackGround");
    }
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

function setDangerBackGround() {
  const nowDate = new Date();
  const finDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    18,
    00,
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
  const testDiff = diffMin - 10;
  if (parseInt(testDiff) < 30 && parseInt(diffHour) < 1) {
    App.classList.toggle("DefaultAppBackGround");
    App.classList.toggle("DangerAppBackGround");
  }
}

setInterval(setDangerBackGround, 500);
