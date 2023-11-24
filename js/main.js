document.addEventListener('DOMContentLoaded', function() {

  async function fetchData() {
    try {
        const response = await fetch('../data/data.json');
        const data = await response.json();
        createElements(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

  function createElements(data) {
    const container = document.getElementById('gui-container');

    data.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = "gui-item";
        entryElement.innerHTML = `
              <div class="gui-item-image">
                  <img src="http://placekitten.com/200/300" alt="preview">
              </div>

              <div class="gui-item-text">
                  <h3 id="project-1">${entry.title}</h3><span>${entry.year}</span>
                  <p>Aliquip ex elit ipsum non. Nostrud esse est ea proident eu mollit reprehenderit non laborum velit voluptate magna aliqua. Irure id id dolore excepteur laborum esse adipisicing elit amet occaecat quis. Adipisicing sint cillum irure do laboris nulla minim occaecat esse ex dolor enim commodo excepteur. Deserunt occaecat incididunt aliquip qui et laboris veniam deserunt nulla do. Irure ullamco et dolor sunt consequat aute eiusmod irure nulla. Fugiat consequat pariatur tempor nisi eiusmod cupidatat cupidatat dolor deserunt.</p>
                  
                  <div class="gui-item-text-tags">
                      <div class="gui-item-tag">
                          Design
                      </div>

                      <div class="gui-item-tag">
                          Web Design
                      </div>
                  </div>
              </div>
        `;

        entryElement.addEventListener('click', () => {
          showPopup(entry);
          console.log(entry.year)
        });

        container.appendChild(entryElement);
    });
  }

  function showPopup(entry) {
    const popupContainer = document.getElementById('popup');

    popupContainer.innerHTML = `
        <div class="popup-container">
        <div class="popup-header">
            <button id="popup-close">X</button>
        </div>

        <div class="popup-main">
            <div class="popup-image-container">
                <div class="popup-image">
                    <img src="http://placekitten.com/200/300" alt="">
                </div>
            </div>

            <div class="popup-text-container">
              <h2>${entry.title}</h2>
              <p>Year: ${entry.year}</p>
              <p>Description: ${entry.description}</p>
              <p>Author(s): ${entry.author.join(', ')}</p>
            </div>
        </div>
      </div>
    `;
    
    popupContainer.style.visibility = "visible";

    document.getElementById("popup-close").addEventListener("click", function(){
      popupContainer.style.visibility = "hidden";
    });
  }

  fetchData();


  // TERMINAL
  //-----------------------------------------------------------------------------------------

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault();
    checkWord();
    window.scrollTo(0,150);
  }

  // TRATAR TEXTO
  document.getElementById('terminal-input').focus();

  var textInputValue = document.getElementById('terminal-input').value.trim();
  var textResultsValue = document.getElementById('terminal-results').innerHTML;

  var clearInput = function(){
    document.getElementById('terminal-input').value = "";
  }
  var scrollBottom = function(){
    var terminalResultsDiv = document.getElementById('terminal-results');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  var addResult = function(textToAdd){
    document.getElementById('terminal-results').innerHTML += "<p>" + textToAdd + "</p>";
    scrollBottom();
  }
  
  // COMANDOS

  var postHelpList = function(){
    var helpKeyWords = [
      "-------- Projects --------",
      "- help: show the list of commands available",
      "- ls: list all the projects",
      "-------- Utilities --------",
      "- Google + keyword to search in Google (ex. google banana)",
      "- YouTube + keyword to search in YouTube (ex. youtube thanks Obama)",
      "- Wiki + keyword to search in Wikipedia (ex. wiki numbers)",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date."
    ].join('<br>');
    addResult(helpKeyWords);
  }
  
  
  var textReplies = function() {
    switch(textInputValueLowerCase){
         
      case "teste":
        clearInput();
        addResult("<a style='text-decoration: underline;' target='_blank' href='https://google.com'>Google Link</a>");
        break;

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
      clearInput();
      addResult("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
      break;
    }
  }
  
  var checkWord = function() {
    textInputValue = document.getElementById('terminal-input').value.trim(); 
    textInputValueLowerCase = textInputValue.toLowerCase(); 

    if (textInputValue != ""){
      addResult("<p class='userEnteredText'>user@gfigueiredo > " + textInputValue + "</p>");

      if (textInputValueLowerCase.substr(0,5) == "open ") {
        redirect('http://' + textInputValueLowerCase.substr(5));
        addResult("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        redirect('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addResult("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        redirect('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
        addResult("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        redirect('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addResult("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };

  document.getElementById("terminal-help-button").addEventListener("click", function(){
    addResult("<p class='userEnteredText'>user@gfigueiredo > help</p>");
    postHelpList();
    scrollBottom();
  })

  scrollBottom();
  addResult("<p class='userEnteredText'>This is the website's command line, type <b>help</b> for the list of commands</p>");
  addResult("<p class='userEnteredText'></p>");

  /*-----    OUTROS  -----*/

  var getTimeAndDate = function(postTimeDay){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    var dateMonth = timeAndDate.getMonth() + 1; 
    var dateYear = timeAndDate.getFullYear();

    if (timeHours < 10){
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10){
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time"){
      addResult(currentTime);
    }
    if (postTimeDay == "date"){
      addResult(currentDate);
    }
  }

  var redirect = function(link){
    window.open(link, '_blank');
    clearInput();
  }
  
  // TERMINAL
  //-----------------------------------------------------------------------------------------

});
  