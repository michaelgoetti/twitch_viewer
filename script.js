
$("#checkOn").click(function() {
	$(".online-stream").toggleClass("hide");
});

$("#checkOff").click(function() {
		$(".offline-stream").toggleClass("hide");
});

var streamArray = ["ESL_SC2", "cretetion", "OgamingSC2", "freecodecamp", "PierreDunn", "DrDisRespectLIVE", "RobotCaleb", "noobs2ninjas"];

var url = 'https://cors-everywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/';

var returnArray = [];
var onlineArr = [];
var offlineArr = [];
var finalArr = [];

$.each(streamArray, function (i) {

	$.getJSON(url + streamArray[i], function(data) {
		if(data.stream !== null) {
			data.status = 'online';
			data.user = streamArray[i];
			onlineArr[onlineArr.length] = data;

			var streamLink = "<a href='https://www.twitch.tv/" + data.user + "' target='_blank'>";
			var logoDiv = "<div class='logo'><img src='" + onlineArr[onlineArr.length -1].stream.channel.logo + "' class='logo-img'/></div>";
			var streamerNameDiv = "<p class='streamer-name'>" + onlineArr[onlineArr.length -1].user + "</p>";
			var streamerDescDiv = "<p class='streamer-desc'>" + onlineArr[onlineArr.length -1].stream.channel.game + "</p>";

			$("#result-box").prepend(streamLink + "<div class='result online-stream col-sm-12'>" + logoDiv + "<div class='streamer-text'>" + streamerNameDiv + streamerDescDiv + "</div></a>");
		} else {	
			data.status = 'offline';
			data.user = streamArray[i];
			offlineArr[offlineArr.length] = data;
			
			var logoDiv = "<div class='logo'><img src='images/blue_question.svg' class='logo-img'/></div>";
			var streamerNameDiv = "<p class='streamer-name'>" + offlineArr[offlineArr.length -1].user + "</p>";
			var streamerDescDiv = "<p class='streamer-desc'>Offline</p>";

			$("#result-box").append("<div class='result offline-stream col-sm-12'>" + logoDiv + "<div class='streamer-text'>" + streamerNameDiv + streamerDescDiv + "</div>");
		}
		returnArray[i] = data;
	});

});