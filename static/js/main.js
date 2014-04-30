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

  for (var i = 0; i < topics.length; i++) {
    var topicsDiv = document.createElement('div');
    $(topicsDiv).attr('class', 'topic');
    // $(topicsDiv).attr('class', 'panel-heading');
    $('.discussion').append(topicsDiv);
    // console.log('should be appending topic: ' + topics[i].topictitle);
    $(topicsDiv)
      .append("<h4><b><a href='#' class='topicLink' id='topic-" + i + "'>" + topics[i].topictitle
        + " (" + topics[i].responses.length + (topics[i].responses.length > 1 ? " replies)": " reply)")
        + "</a></b></h3>"
        + "<div class='line-separator'></div>");

    // List responses on page. Use responsesDiv to tie all responses for specific topic to event handlder in Responses() function
    var responsesDiv = document.createElement('div');
    $(responsesDiv).attr('class', 'responses-' + i);
    $('.discussion').append(responsesDiv);

    var responseChildDict = {};
    // Create div for individual responses
    for (var x = 0; x < topics[i].responses.length; x++) {
      if (topics[i].responses[x].depth % 2 === 0) {
        addDepthResponse(topics[i].responses[x], responsesDiv, 'bubbleblueleft', responseChildDict);
      } else {
        addDepthResponse(topics[i].responses[x], responsesDiv, 'bubblegreyleft', responseChildDict);
      }


      // var responseWrapper = document.createElement('div');
      // $(responsesDiv).append(responseWrapper);

      // $(responseWrapper).append("<img class='blankavatar' src='../static/img/blank_avatar.jpg'>");
  
      // var bubbleWrapper = document.createElement('div');
      // $(bubbleWrapper).attr('class', 'bubblewrap');
      // $(responseWrapper).append(bubbleWrapper);

      // var responseContainer = document.createElement('div');
      // $(responseContainer).attr('class', 'bubbleblueleft');
      // $(bubbleWrapper).append(responseContainer);

      // var responseInfo = document.createElement('div');
      // $(responseContainer).append(responseInfo);
      // var responseContent = document.createElement('div');
      // $(responseContainer).append(responseContent);

      // $(responseInfo)
      //     .append('<p class = \'response\'>'
      //       + '<b><a href=\'#\'>' + topics[i].responses[x].author + '</a></b> '
      //       + 'id: ' + topics[i].responses[x].id + ' '
      //       + 'parentid: ' + topics[i].responses[x].parentid + ' '
      //       + 'depth: ' + topics[i].responses[x].depth + ' '
      //       + 'age: ' + topics[i].responses[x].age
      //       );
      // $(responseContent)
      //     .append('<p class = \'response\'>'
      //       + topics[i].responses[x].posttext);
    }
  }
};

// Add reponses
var addDepthResponse = function(response, responsesDiv, bubbleclass, responseChildDict) {
      var id = response.id;
      var parentid = response.parentid;
      var depth = response.depth;

      var responseWrapper = document.createElement('div');
      $(responseWrapper).attr('class','responsediv').attr('id', 'response-' + id);
      $(responsesDiv).append(responseWrapper);

      // indent based on depth
      var indent = response.depth*30;
      $(responseWrapper).css('margin-left',"+=" + indent);

      // Created response Wrapper to be able to position blankavator image and bubbleWrapper
      $(responseWrapper).append("<img class='blankavatar' src='../static/img/blank_avatar.jpg'>");
  
      var bubbleWrapper = document.createElement('div');
      $(bubbleWrapper).attr('class', 'bubblewrap');
      $(responseWrapper).append(bubbleWrapper);

      var responseContainer = document.createElement('div');
      $(responseContainer).attr('class', bubbleclass);
      $(bubbleWrapper).append(responseContainer);

      var responseInfo = document.createElement('div');
      $(responseContainer).append(responseInfo);
      var responseContent = document.createElement('div');
      $(responseContainer).append(responseContent);
      var responseControls = document.createElement('div');
      $(responseContainer).append(responseControls);

      if (responseChildDict[parentid]) {
        $(responseChildDict[parentid]).append(responseWrapper);
      } else {
        var responseChild = document.createElement('div');
        $(responseChild).attr('class', 'childrenWrapper');
        $('#response-' + parentid).after(responseChild);
        $(responseChild).append(responseWrapper);
        responseChildDict[parentid] = responseChild;
      }

      // indent based on depth
      // var indent = response.depth*30;
      // $(responseWrapper).css('margin-left',"+=" + indent);

      $(responseInfo)
          .append('<p class = \'response\'>'
            + '<b><a href=\'#\'>' + response.author + '</a></b> '
            + secondsToTime(response.age)
            + '<br> id: ' + response.id + ' '
            + 'parentid: ' + response.parentid + ' '
            + 'depth: ' + response.depth
            );
      $(responseContent)
          .append('<p class = \'response\'>'
            + response.posttext);
      $(responseControls)
        .append("<form class = 'reply'>"
          + "<input type='text' class='form-control replybox' id='replyform" + id + " name='content'>"
          + "<button type='button' class='btn btn-primary btn-sm replybutton' data-panelid='replyform" + id + "'>Reply</button>"
          + "</form>"
          );

};

        // .append("<div><button type=\"button\" class=\"btn btn-primary btn-xs\" replybutton>Reply</button></div>"

// Event handler to hide all responses when click on topic (preventdefault to prevent from going to href = # in Topics())
var toggleResponses = function(data) {
  var topics = data.topics;
  $('.topicLink').click(function(event){
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


// Takes in replies
var replyButton = function(){
  $('.replybutton').click(function(event) {
    var panelid = $(this).attr("data-panelid");
    var inputresponse = $('#'+panelid).val();
    console.log(inputresponse);
  });
};





////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


function showActive() {
  $('.toggle-active .btn').change(function(event) {
    if ($(event.target).prop("id") === "toggle-active-on") {
      $.ajax({
        url: "/leafactivelistings",
      }).done(function(data) {
        prices = $.parseJSON(data);
        createMarkers(prices);
      });
    } else {
      if (markers !== null) {
        map.removeLayer(markers);
      }
    }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// SECTION 

function showHeatMap(region, urli, metric) {
    if (heatLayerCount === 1) {
      throw 'WTF';
    }
    $.ajax({
// pulls "data" from the data returned in the path /geoidpricesajax
      url: urli,
// .done is a callback, submits function and waits for callback
      }).done(function(data){
// extra careful with browser issues
      if (console && console.log ) {
// takes JSON data and converts it JS objects 
        geoIdPrices = $.parseJSON(data);
// call heatColors AFTER stuff above has loaded
        $("#radio").removeClass("is-nodisplay");
        heatColors(region, metric);
        removeLegend();
        createLegend();
      }
    });
}


// toggle checkbox to show and remove heatmap layer
function toggleHeatMap(region) {
  $('.toggle-heat .btn').change(function(event){
// if toggle button on, show radio button
    if ($(event.target).prop("id") === "toggle-heat-on") {
        $("#radio").removeClass("is-nodisplay");
       if ($("#SPSC").is(":checked")) {
          $("#year-slider").removeClass("is-nodisplay");
          $("#slider-range").show();
            currentMetric = 'change';
            var values = $('#slider-range').slider('values');
            growthChange(values[0], values[1], geochanges, zips, currentMetric);
        } else {
            heatColors(region,currentMetric);
            createLegend();
        }
// if prices $ change checked at time of toggling, add back slider range
    } else {
// removes metrics options if heatmap toggle is unchecked along with layer and legend
      $("#radio").addClass("is-nodisplay");
      console.log("removing heat layer");
      heatLayerCount -= 1;
      map.removeLayer(heatLayer);
      removeLegend();
// if sales price % change checked at time of toggling, removes slider range
     if ($("#SPSC").is(":checked")) {
        $("#year-slider").addClass("is-nodisplay");
        $("#slider-range").hide();
      }
    }
  });
}


function showActive() {
  $('.toggle-active .btn').change(function(event) {
    if ($(event.target).prop("id") === "toggle-active-on") {
      $.ajax({
        url: "/leafactivelistings",
      }).done(function(data) {
        prices = $.parseJSON(data);
        createMarkers(prices);
      });
    } else {
      map.removeLayer(markers);
    }
  });
}


function growthChange(baseyear, compyear, urli, region, metric) {
    console.log(baseyear);
    console.log(compyear);

      $.ajax({
      url: urli,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({"baseyear":baseyear, "compyear":compyear})
      }).done(function(data){
        geoIdPrices = $.parseJSON(data);
        heatColors(region, metric);
        removeLegend();
        createLegend();
    });
}
