<head>
<link
href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
rel="stylesheet"
/>
<!-- Stylesheet -->
<link rel="stylesheet" href="style.css" />
</head>
<body>
<div class="mt-10 w-64 flex items-center justify-center mx-auto">
<div class="container">
 <div class="circular-progress">
   <div class="value-container">0%</div>
 </div>
<div>
  <p class="text-center text-bold text-xl mb-5">Top Speed</p>
</div>
</div>
</div>

<style>
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .container {
    height: 200px;
    width: 100vw;
    border-radius: 8px;
    display: grid;
    place-items: center;
    
  }
  .circular-progress {
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .circular-progress:before {
    content: "";
    position: absolute;
    height: 84%;
    width: 84%;
    background-color: #ffffff;
    border-radius: 50%;
  }
  .value-container {
  position: relative;
  font-family: "Poppins", sans-serif;
  font-size: 25px;
  color: black;
  transition: font-size 0.3s ease; /* Check if this is intentional */
}

</style>


<!-- Script -->
<script>
let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let progressValue = 0;
let progressEndValue = 100; //CHANGE TO OUR SPEED VALUE!!!
let speed = 15;

let progress = setInterval(() => {
  progressValue++;
  valueContainer.textContent = `${progressValue}km/h`;
  progressBar.style.background = `conic-gradient(
    #FFA500 ${progressValue * 3.6}deg,
    #FFEBCC ${progressValue * 3.6}deg
  )`;
  if (progressValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);
</script>

</body>
  