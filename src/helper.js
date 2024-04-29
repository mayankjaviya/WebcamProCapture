var offsetX, offsetY;
var isDragging = false;
var pipElement;
var pipStream;

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
