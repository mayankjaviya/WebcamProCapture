window.showPreview = (recordedChunks, options) => {
  console.log("MIME Type:", options.mimeType);
  const blob = new Blob(recordedChunks, { type: options.mimeType });
  const videoURL = URL.createObjectURL(blob);

  const videoElement = document.createElement("video");
  // set width 100%
  videoElement.width = "500";
  videoElement.src = videoURL;
  videoElement.controls = true;

  const retakeButton = document.createElement("button");
  retakeButton.textContent = "Retake";

  retakeButton.classList.add("btn", "btn-danger", "m-2");
  retakeButton.onclick = () => {
    URL.revokeObjectURL(videoURL);
    videoElement.remove();
    retakeButton.remove();
    submitButton.remove();
  };

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.classList.add("btn", "btn-success", "m-2");
  submitButton.onclick = () => {
    // download video
    const link = document.createElement("a");
    link.href = videoURL;
    link.download = "webcam-recording.mp4";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // URL.revokeObjectURL(videoURL);
  };

  document.body.appendChild(videoElement);
  document.body.appendChild(retakeButton);
  document.body.appendChild(submitButton);
};

window.livePreview = (elementId) => {
  let videoElement = document.getElementById(elementId);
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // Attach stream to video element
      videoElement.srcObject = stream;
      videoElement.style.transform = "scaleX(-1)";
      videoElement.classList.remove("d-none");
    })
    .catch((error) => {
      alert("Error accessing webcam:", error);
    });
};

window.stopLivePreview = (elementId, remove = false) => {
  let videoElement = document.getElementById(elementId);
  if (videoElement) {
    videoElement?.srcObject?.getTracks()?.forEach((track) => track.stop());
    videoElement.classList.add("d-none");

    if (remove) {
      videoElement.remove();
    }
  }
};
