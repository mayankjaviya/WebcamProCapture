var offsetX, offsetY;
var isDragging = false;
var pipElement;
var pipStream;

window.allowDrag = (elementId) => {
  var draggable = document.getElementById(elementId);
  draggable.addEventListener("mousedown", function (event) {
    isDragging = true;
    // Calculate the offset between mouse position and element position
    offsetX = event.clientX - draggable.getBoundingClientRect().left;
    offsetY = event.clientY - draggable.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", function (event) {
    if (isDragging) {
      // Calculate new position based on mouse movement
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      // Update element position
      draggable.style.left = x + "px";
      draggable.style.top = y + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
};

window.togglePIP = () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    pipElement = document.createElement("video");
    pipElement.id = "pipOverlayStream";
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      // Attach stream to video element
      pipElement.srcObject = stream;
      pipStream = stream;
      pipElement.autoplay = true;
      //   pipElement.classList.remove("d-none");
      pipElement.addEventListener("loadedmetadata", () => {
        pipElement.requestPictureInPicture().catch((error) => {
          console.error("Failed to enter Picture-in-Picture mode:", error);
        });
      });

      pipElement.addEventListener("leavepictureinpicture", (e) => {
        pipStream.getTracks().forEach((track) => track.stop());
      });
    });
  }
};
