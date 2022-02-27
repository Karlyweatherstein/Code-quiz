// Timer start
function startTimer(){
    var counter = 60;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("timer");
        span.innerHTML = counter;
      }
      else if (counter === 0) {
          alert('Out of time!');
          clearInterval(counter);
      }
    }, 1000);
  }
function countdown() {
    document.getElementById("start").addEventListener("click", startTimer);
    
    startTimer();
};


document.getElementById("start").addEventListener("click", startTimer);

// Timer End