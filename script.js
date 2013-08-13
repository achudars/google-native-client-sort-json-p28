/******************/
var HelloTutorialModule = null;  // Global application object.
var checkStatus = function(statusText) {
	body = document.getElementsByTagName("body")[0];
	if (statusText === "LOADING...") {
		body.className = "loading";
	} else if (statusText === "SUCCESS") {
		body.className = "success";
    // immediately communicate with C++ code
    reload();
	}
};
checkStatus();

var reload = function() {
	HelloTutorialModule = document.getElementById('sort_json');
  msg = document.getElementById('input2').value;
	HelloTutorialModule.postMessage(msg);
  getExpectedResult();
};

    statusText = 'NO-STATUS';
    // Indicate load success.
    function moduleDidLoad() {
      updateStatus('SUCCESS');
    }

    // The 'message' event handler.  This handler is fired when the NaCl module
    // posts a message to the browser by calling PPB_Messaging.PostMessage()
    // (in C) or pp::Instance.PostMessage() (in C++).  This implementation
    // simply displays the content of the message in an alert panel.
    function handleMessage(message_event) {
      document.getElementById('output').innerHTML = message_event.data;
    }

    // If the page loads before the Native Client module loads, then set the
    // status message indicating that the module is still loading.  Otherwise,
    // do not change the status message.
    function pageDidLoad() {
      if (HelloTutorialModule === null) {
        updateStatus('LOADING...');
      } else {
        // It's possible that the Native Client module onload event fired
        // before the page's onload event.  In this case, the status message
        // will reflect 'SUCCESS', but won't be displayed.  This call will
        // display the current message.
        updateStatus();

      }

    }

    // Set the global status message.  If the element with id 'statusField'
    // exists, then set its HTML to the status message as well.
    // opt_message The message test.  If this is null or undefined, then
    // attempt to set the element with id 'statusField' to the value of
    // |statusText|.
    function updateStatus(opt_message) {
      if (opt_message)
        statusText = opt_message;
        checkStatus(statusText);
      var statusField = document.getElementById('status_field');
      if (statusField) {
        statusField.innerHTML = statusText;
      }
    }


var getExpectedResult = function() {
  var numbers = JSON.parse(Array(document.getElementById('input').value));

  function sortByKey(array, key) {
      return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  }
  numbers = sortByKey(numbers, 'name');
  document.getElementById('expectedOutput').innerHTML = JSON.stringify(numbers);
};

