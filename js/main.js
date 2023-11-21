document.addEventListener('DOMContentLoaded', function() {

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
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminal-results');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  var addTextToResults = function(textToAdd){
    document.getElementById('terminal-results').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }



  // COMANDOS

  var postHelpList = function(){
    var helpKeyWords = [
      "- Open + website URL to open it in the browser (ex. open mahdif.com)",
      "- Google + keyword to search directly in Google (ex. google banana)",
      "- YouTube + keyword to search directly in YouTube (ex. youtube thanks Obama)",
      "- Wiki + keyword to search directly in Wikipedia (ex. wiki numbers)",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date.",
      "- 'ironman' will make you happy",
      "- 'cat videos' will make you even happier",
      "* There are more keywords that you have to discover by yourself."
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  var textReplies = function() {
    switch(textInputValueLowerCase){
      // funny replies [START]          
      case "teste":
        clearInput();
        addTextToResults("<a style='text-decoration: underline;' target='_blank' href='https://google.com'>Google Link</a>");
        break;

      case "i love you":
      case "love you":
      case "love":
        clearInput();
        addTextToResults("Love");
        break;

      case "ironman":
      case "iron man":
      case "shoot to thrill":
        clearInput();
        addTextToResults('Shoot to Thrill!');
        openLinkInNewWindow('https://www.youtube.com/watch?v=xRQnJyP77tY');
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
      addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
      break;
    }
  }

  var checkWord = function() {
    textInputValue = document.getElementById('terminal-input').value.trim(); 
    textInputValueLowerCase = textInputValue.toLowerCase(); 

    if (textInputValue != ""){
      addTextToResults("<p class='userEnteredText'>user@gfigueiredo > " + textInputValue + "</p>");

      if (textInputValueLowerCase.substr(0,5) == "open ") {
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
        addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };

  scrollToBottomOfResults();
  addTextToResults("<p class='userEnteredText'>This is the website's command line, type <b>help</b> for the list of commands</p>");
  addTextToResults("<p class='userEnteredText'></p>");




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
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date"){
      addTextToResults(currentDate);
    }
  }

});
  