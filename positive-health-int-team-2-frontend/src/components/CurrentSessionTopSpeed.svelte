<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      min-height: 100%;
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }
    .circular-progress, .inner-circle {
      border: none;
    }
  </style>
</head>
<body class="flex items-center justify-center bg-gray-100">
  <div class="w-full flex justify-center">
  <div>
    <div class="circular-progress flex items-center justify-center bg-ffebcc rounded-full mx-auto" style="height: 150px; width: 150px;">
      <div class="inner-circle flex items-center justify-center rounded-full bg-white" style="height: 130px; width: 130px;">
        <div class="value-container text-2xl font-bold">0 km/h</div>
      </div>
    </div>
    <p class="text-center font-bold text-xl mt-4">Top Speed</p>
  </div>
</div>
  
  <style>
    .circular-progress {
      border-radius: 50%;
      background-color: #FFEBCC;
    }
    .inner-circle-wrapper {
      border-radius: 50%;
      overflow: hidden;
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
      valueContainer.textContent = `${progressValue}%`;
      progressBar.style.background = `conic-gradient(
        #FFA500 ${progressValue * 3.6}deg,
        transparent ${progressValue * 3.6}deg
      )`;
      if (progressValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  </script>
</body>
