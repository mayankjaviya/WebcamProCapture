## Introduction
Webcam Pro Capture provides functionality to record video from a webcam, screen, or both simultaneously. It utilizes the MediaRecorder API and provides methods to start, pause, resume, and stop recording. Additionally, it supports live preview of the webcam, and allows toggling Picture-in-Picture (PIP) mode.

## Features
- Record video from webcam, screen, or both simultaneously.
- Start, pause, resume, and stop recording.
- Live preview of webcam.
- Toggle Picture-in-Picture (PIP) mode.

## Usage
1. Import the webcamRecorder.js module into your project.
2. Use the provided methods to control recording:
```bash
// Start recording from webcam
webcamRecorder.startRecording();

// Start recording screen
webcamRecorder.startScreenRecording();

// Start recording both webcam and screen simultaneously
webcamRecorder.startBothRecording();

// Pause recording
webcamRecorder.pauseRecording();

// Resume recording
webcamRecorder.resumeRecording();

// Stop recording
webcamRecorder.stopRecording();

// Get current recording status
const recordingStatus = webcamRecorder.status();
```

## Example
```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webcam Recorder Example</title>
</head>
<body>
  <video id="preview" autoplay></video>
  <button onclick="webcamRecorder.startRecording()">Start Recording</button>
  <button onclick="webcamRecorder.stopRecording()">Stop Recording</button>

    <script type="module">
      import webcamRecorder from "./src/webcamRecorder.js";
    </script>
</body>
</html>
