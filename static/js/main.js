var maxId = 135;

var initForum = function () {

    console.log(data);
    displayAll(data);
    toggleResponses(data);
    replyButton();
};


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// SECTION Show Topics and Responses

var displayAll = function(data) {
  // List topics on page
  var topics = data.topics;
  // create Topicsdivs to contain each topic
  for (var i = 0; i < topics.length; i++) {
    var topicsDiv = document.createElement('div');
    $(topicsDiv).attr('class', 'topic');
    // $(topicsDiv).attr('class', 'panel-heading')
    // append topicsDiv to primary div in html file
    $('.discussion').append(topicsDiv);
    // console.log('should be appending topic: ' + topics[i].topictitle);
    // add topic information along with number of replies into Topics div
    $(topicsDiv)
      .append("<h4><b><a href='#' class='topicLink' id='topic-" + i + "'>" + topics[i].topictitle
        + " (" + topics[i].responses.length + (topics[i].responses.length > 1 ? " replies)": " reply)")
        + "</a></b></h3>"
        + "<div class='line-separator'></div>");

    // create responsesDiv to hold all responses to a given topic & append to primary div in html file, under topicsDiv
    var responsesDiv = document.createElement('div');
    // create unique class with each response and id
    $(responsesDiv).attr('class', 'responses-' + i);
    $('.discussion').append(responsesDiv);

    var responseChildDict = {};
    // Create div for individual responses and append to responsesDiv, alternating colors for each depth level
    for (var x = 0; x < topics[i].responses.length; x++) {
      if (topics[i].responses[x].depth % 2 === 0) {
        addDepthResponse(topics[i].responses[x], responsesDiv, 'bubbleblueleft', responseChildDict);
      } else {
        addDepthResponse(topics[i].responses[x], responsesDiv, 'bubblegreyleft', responseChildDict);
      }
    }
  }
};

// Add responses
var addDepthResponse = function(response, responsesDiv, bubbleclass, responseChildDict) {
      var id = response.id;
      var parentid = response.parentid;
      var depth = response.depth;

      // create wrapper to hold each response to append to responsesDiv (which holds all responses to a given topic)
      var responseWrapper = document.createElement('div');
      $(responseWrapper).attr('class','responsediv').attr('id', 'response-' + id);
      $(responsesDiv).append(responseWrapper);

      // indent based on depth
      var indent = response.depth*30;
      $(responseWrapper).css('margin-left',"+=" + indent);

      // Add blankavator image to resopnseWrapper and append bubbleWrapper div to hold the rest
      $(responseWrapper).append("<img class='blankavatar' src='../static/img/blank_avatar.jpg'>");
  
      // Bubblewrapper Div to append into resopnseWrapper, to be able to position relative to avatar
      var bubbleWrapper = document.createElement('div');
      $(bubbleWrapper).attr('class', 'bubblewrap');
      $(responseWrapper).append(bubbleWrapper);

      // create another div within the bubble to hold all the content - created a separate div from bubbleWrapper so could 
        // trade-off color of bubbleclass
      var responseContainer = document.createElement('div');
      $(responseContainer).attr('class', bubbleclass);
      $(bubbleWrapper).append(responseContainer);

      // responseInfo holds the response information like author, time, etc
      var responseInfo = document.createElement('div');
      $(responseContainer).append(responseInfo);
      // responseContent holds the responses content
      var responseContent = document.createElement('div');
      $(responseContainer).append(responseContent);
      // responseControls holds the response buttons
      var responseControls = document.createElement('div');
      $(responseContainer).append(responseControls);

      // TODO ???? This is creating the div that contains all the same depth responses to a certain comment
      if (responseChildDict[parentid]) {
        $(responseChildDict[parentid]).append(responseWrapper);
      } else {
        var responseChild = document.createElement('div');
        $(responseChild).attr('class', 'childrenWrapper');
        $('#response-' + parentid).after(responseChild);
        $(responseChild).append(responseWrapper);
        responseChildDict[parentid] = responseChild;
      }

      // Add response information - author, age, etc
      $(responseInfo)
          .append('<p class = \'response\'>'
            + '<b><a href=\'#\'>' + response.author + '</a></b> '
            + secondsToTime(response.age)
            + '<br> id: ' + response.id + ' '
            + 'parentid: ' + response.parentid + ' '
            + 'depth: ' + response.depth
            );
      // Add content of comments
      $(responseContent)
          .append('<p class = \'response\'>'
            + response.posttext);
      // Add reply buttons
      $(responseControls)
        .append("<form class = 'reply'>"
          + "<input type='text' class='form-control replybox' id='replyform" + id + " name='content'>"
          + "<button type='button' class='btn btn-primary btn-sm replybutton' data-panelid='replyform" + id + "'>Reply</button>"
          + "</form>"
          );

};


// Event handler to hide all responses when click on topic 
var toggleResponses = function(data) {
  var topics = data.topics;
  $('.topicLink').click(function(event){
      // preventdefault to prevent from going to href = # in displayAll()
      event.preventDefault();
      var topicNumber = $(this).attr('id').substring('topic-'.length);
      $('.responses-' + topicNumber).slideToggle('slow');
  });
};

// convert seconds to hours and minutes
var secondsToTime = function(totalSeconds) {
  days = Math.floor(totalSeconds / (60*60*24));
  totalSeconds %= (60*60*24);
  hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  minutes = Math.floor(totalSeconds / 60);
  seconds = totalSeconds % 60;

  return "about " + (days > 0 ? days + " day(s) ago":
    hours > 0 ? hours + " hour(s) ago":
    minutes > 0 ? minutes + " minute(s) ago":
    seconds + " second(s) ago"
    );
};


// Reads replies
// TODO need to add responses into temp dictionary to temporarily hold & display with discussion.json until user refreshes
  // need to use responseChildDict and the responseChild div that holds all same-depth responses
var replyButton = function(){
  $('.replybutton').click(function(event) {
    var panelid = $(this).attr("data-panelid");
    var inputresponse = $('#'+panelid).val();
    console.log(inputresponse);
  });
};




