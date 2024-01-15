var compliments = [
    "あなたは素晴らしい人です。",
    "あなたの笑顔は最高です。",
    "あなたはとても頭が良いです。",
    "あなたは他の人を励ます力を持っています。",
    "あなたの努力は素晴らしいです。",
    "あなたは才能にあふれています。",
    "あなたは非常に才能のある人です。",
    "あなたの努力と献身は素晴らしいです。",
    "あなたのエネルギーは周りの人々を元気づけます。",
    "あなたの創造性とアイデアは驚くべきものです。",
    "あなたは信頼できるリーダーです。",
    "あなたの優れたコミュニケーション能力は素晴らしいです。",
    "あなたの勇気と決断力は称賛に値します。",
    "あなたは素晴らしいチームプレイヤーです。",
    "あなたの目標に対する情熱は見習うべきものです。",
    "あなたは素晴らしい友人であり、支えとなってくれます。"
  ];
  
  var currentIndex = -1;
  var speechQueue = [];
  var isPaused = false;
  var timeoutId;
  
  function startGenerator() {
    if (!isSpeechSynthesisSupported()) {
      var compliment = document.getElementById("compliment");
      compliment.textContent = "音声合成が利用できるブラウザを利用してください。";
      return;
    }
  
    var title = document.getElementById("title");
    var startButton = document.getElementById("startButton");
    var pauseButton = document.getElementById("pauseButton");
    var resumeButton = document.getElementById("resumeButton");
  
    title.classList.add("hidden");
    startButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
    resumeButton.classList.add("hidden");
  
    generateCompliment();
  }
  
  function pauseGenerator() {
    isPaused = true;
  
    var pauseButton = document.getElementById("pauseButton");
    var resumeButton = document.getElementById("resumeButton");
  
    pauseButton.classList.add("hidden");
    resumeButton.classList.remove("hidden");
  
    clearTimeout(timeoutId);
    window.speechSynthesis.cancel();
  }
  
  function resumeGenerator() {
    isPaused = false;
  
    var pauseButton = document.getElementById("pauseButton");
    var resumeButton = document.getElementById("resumeButton");
  
    pauseButton.classList.remove("hidden");
    resumeButton.classList.add("hidden");
  
    playNextSpeech();
  }
  
  function generateCompliment() {
    currentIndex++;
    if (currentIndex >= compliments.length) {
      currentIndex = 0;
    }
  
    var compliment = document.getElementById("compliment");
    compliment.textContent = compliments[currentIndex];
    speakCompliment(compliments[currentIndex]);
  }
  
  function speakCompliment(compliment) {
    var utterance = new SpeechSynthesisUtterance(compliment);
    speechQueue.push(utterance);
  
    if (!isPaused) {
      playNextSpeech();
    }
  }
  
  function playNextSpeech() {
    if (speechQueue.length > 0) {
      var utterance = speechQueue.shift();
      utterance.onend = function() {
        timeoutId = setTimeout(function() {
          generateCompliment();
        }, 0);
      };
      window.speechSynthesis.speak(utterance);
    }
  }
  
  function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window && window.speechSynthesis;
  }
  