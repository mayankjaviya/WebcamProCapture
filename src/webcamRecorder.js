// myLibrary.js
import "./utils.js";
import "./helper.js";

window.webcamRecorder = {
  webcamVideoElement: null,
  mediaStream: null,
  mediaRecorder: null,
  recordedChunks: [],
  videoElement: null,
  options: {
    mimeType: "video/webm",
    videoConstraints: { video: true, audio: true },
  },

  startRecording: async function () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.options.videoConstraints
      );
      this.mediaStream = stream;
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: this.options.mimeType,
      });
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
          showPreview(this.recordedChunks, this.options);
        }
      };
      this.mediaRecorder.start();
      this.livePreview("preview");
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Error accessing webcam:", error);
    }
  },

  startScreenRecording: function () {
    navigator.mediaDevices
      .getDisplayMedia({ ...this.options.videoConstraints, audio: true })
      .then(async (stream) => {
        let audio = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        let combine = new MediaStream([
          ...stream.getTracks(),
          ...audio.getTracks(),
        ]);
        this.mediaStream = combine;
        this.recordedChunks = [];
        this.mediaRecorder = new MediaRecorder(combine, {
          mimeType: this.options.mimeType,
        });

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
            this.stopLivePreview("webCamScreen", true);
            showPreview(this.recordedChunks, this.options);
            if (document.pictureInPictureElement) {
              document.exitPictureInPicture();
            }
          }
        };

        this.mediaRecorder.start();

        this.mediaRecorder.onstop = () => {
          /* Convert the recorded audio to
               blob type mp4 media */
          let blobData = new Blob(data, { type: "video/mp4" });

          // Convert the blob data to a url
          let url = URL.createObjectURL(blobData);

          // Assign the url to the output video tag and anchor
          output.src = url;
          anc.href = url;
        };
      })
      .catch((error) => {
        console.error("Error accessing screen:", error);
        this.stopLivePreview("webCamScreen", true);
      });
  },

  startBothRecording: async function () {
    this.startScreenRecording();
    this.togglePIP();
  },

  pauseRecording: function () {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
    }
  },

  resumeRecording: function () {
    if (this.mediaRecorder && this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
    }
  },

  stopRecording: function () {
    this.stopLivePreview("preview");
    this.stopLivePreview("webCamScreen", true);
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (this.webcamVideoElement) {
      this.webcamVideoElement.remove();
    }
  },

  status: function () {
    return this.mediaRecorder.state;
  },

  livePreview: (elementId) => livePreview(elementId),

  togglePIP: () => togglePIP(),

  stopLivePreview: (elementId, remove = false) =>
    stopLivePreview(elementId, remove),
};

export default webcamRecorder;
