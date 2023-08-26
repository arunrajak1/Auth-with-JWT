import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const RecordScreen = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingType, setRecordingType] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      screen: recordingType === "screen",
      audio: true,
      video: recordingType === "webcam",
    });

  const handleStartRecording = (type) => {
    setConfirmed(true);
    setRecordingType(type);
  };

  const handleToggleRecording = () => {
    if (!confirmed) return;

    if (recording) {
      stopRecording();
      setRecording(false);
    } else {
      startRecording();
      setRecording(true);
    }
  };

  const handleSaveRecording = () => {
    if (mediaBlobUrl) {
      setRecordedChunks((prevChunks) => [...prevChunks, mediaBlobUrl]);
      clearBlobUrl();


      //for store recording on server Example: Amazon S3
      // const formData = new FormData();
      // formData.append("video", mediaBlobUrl);
      // await axios.post("/upload", formData);
    }
  };

  const handleDownloadBlob = (blobUrl) => {
    fetch(blobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recorded_chunk.mp4";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen mb-5">
      {!confirmed && (
        <div>
          <button
            className="rounded-lg bg-sky-400 border  hover:bg-sky-600 text-white px-6 py-2 mr-4"
            onClick={() => handleStartRecording("screen")}
          >
            Record Entire Window
          </button>
          <button
            className="rounded-lg bg-sky-400   hover:bg-sky-600 border text-white px-6 py-2 ml-2"
            onClick={() => handleStartRecording("webcam")}
          >
            Record Webcam
          </button>
        </div>
      )}
      {confirmed && (
        <>
          <div className=" flex flex-row ">
            <button
              className="rounded-lg bg-sky-400  hover:bg-sky-600 border text-white px-6 py-2 mr-4 mb-10"
              onClick={handleToggleRecording}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
            {recording && (
              <button
                className="rounded-lg bg-sky-400   hover:bg-sky-600 border text-white px-6 py-2 ml-2 mb-10"
                onClick={handleSaveRecording}
              >
                Save Recording
              </button>
            )}
          </div>
          <video src={mediaBlobUrl} autoPlay loop controls></video>
        </>
      )}
      {recordedChunks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-serif mb-2">Recorded Chunks:</h2>
          <ul>
            {recordedChunks.map((blobUrl, index) => (
              <li key={index}>
                <button
                  className="rounded-lg bg-sky-400   hover:bg-sky-600 border text-white px-6 py-2 mb-2"
                  onClick={() => handleDownloadBlob(blobUrl)}
                >
                  Download Chunk {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecordScreen;
