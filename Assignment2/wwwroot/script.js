var len;
var results = '';

var backgroundImages = new Array();
backgroundImages[0] = 'bg_unsplash.jpg';
backgroundImages[1] = 'bg_unsplash2.jpg';
backgroundImages[2] = 'bg_unsplash3.jpg';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://jawaller-421-search-api.cognitiveservices.azure.com/bing/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "76050605fe8047589079475806d2af5a");
      },
      type: "GET",
    })
    .done(function (data) {
        len = data.webPages.value.length;
        results += "<table border=\"1\"><th>Headline</th><th>Description</th>"

        for (i = 0; i < len; i++) {
          results += "<tr><td><p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a></td><td> " + data.webPages.value[i].snippet + "</p></td></tr>";
        }
        document.getElementById('searchResults').style.visibility = "visible";
        results+="</table>"

      $('#searchResults').html(results);
        $('#searchResults').dialog({
            title: "Search Results",
            width: screen.width-200,
            height: screen.height - 250,
            modal: true,
            buttons: {
                Close: function () {
                    $(this).dialog('close');
                    document.getElementById('searchResults').style.visibility = "hidden";
                    results = "";
                }
            }
        });
    })
    .fail(function () {
      alert("error");
    });
}


function changeBackground() {
    var index = 0;

    if (document.body.style.backgroundImage == "") {
        document.body.style.backgroundImage = "url(\"" + backgroundImages[1] + "\")";
        return;
    }

    for (var i = 0; i < 3; i++) {
        if ("url(\"" + backgroundImages[i] + "\")" == document.body.style.backgroundImage) {
            index = i;
            break;
        }
    }

    if (index == 2) {
        document.body.style.backgroundImage = "url(\"" + backgroundImages[0] + "\")";
    } else {
        document.body.style.backgroundImage = "url(\"" + backgroundImages[i+1] + "\")";
    }

    
}

function getCurrentTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var tod = "am";

    if (hours > 12) {
        hours -= 12;
        tod = "pm";
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var currentTime = hours + ":" + minutes + tod;

    document.getElementById("time").innerHTML = currentTime;
    $(document).ready(function () {
        $('#time').dialog({
            title: "Current Time",
            width: 430,
            height: 200,
            modal: true,
            buttons: {
                Close: function () { $(this).dialog('close') }
            }
        });
    });
}

function showTime() {
    document.getElementById("time").style.visibility = "visible";
    getCurrentTime();
}

function feelingLucky() {

    changeBackground();
    changeBackground();

    if ($('#query').val()) {
        var params = {
            "q": $("#query").val(),
            "count": "50",
            "offset": "0",
            "mkt": "en-us"
        };

        $.ajax({
            url: 'https://jawaller-421-search-api.cognitiveservices.azure.com/bing/v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "76050605fe8047589079475806d2af5a");
            },
            type: "GET",
        })
            .done(function (data) {
                window.open(data.webPages.value[0].url);
            })
            .fail(function () {
                alert("error");
            });
    } else {
        document.getElementById("dialog").style.visibility = "visible";
        document.getElementById("dialog").innerHTML = "You must enter something into the search bar first.";
        $(document).ready(function () {
            $('#dialog').dialog({
                title: "Error!",
                width: 640,
                height: 200,
                modal: true,
                buttons: {
                    Close: function () {
                        $(this).dialog('close')
                        document.getElementById("dialog").style.visibility = "hidden";}
                }
            });
        });
    }
}
