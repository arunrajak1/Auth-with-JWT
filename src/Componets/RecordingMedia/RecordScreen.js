import React, {  useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useLocation, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver'


const RecordScreen = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingFinished, setRecordingFinished] = useState(false);

  const [recordingType, setRecordingType] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate()
  const location = useLocation()
  const name = location?.state?.name
  const email = location?.state?.email

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
      setRecordingFinished(true);
    } else {
      startRecording();
      setRecording(true);
    }
  };

  const handleSaveRecording = () => {
    // console.log(mediaBlobUrl,"<=blobUrl")
    if (mediaBlobUrl) {
      setRecordedChunks((prevChunks) => [...prevChunks, mediaBlobUrl]);
      clearBlobUrl();


      //for store recording on server Example: Amazon S3
      // const formData = new FormData();
      // formData.append("video", mediaBlobUrl);
      // await axios.post("/upload", formData);
    }
  };


  const handleDownloadBlob = async (blobUrl) => {
    try {
     
      localStorage.setItem('recording',blobUrl)
      if (blobUrl) {
        const mp4File = new File([blobUrl], 'demo.mp4', { type: 'video/mp4' })
        saveAs(mp4File, `Video-${Date.now()}.mp4`)
      }
   
    } catch (error) {
      console.error("Error downloading blob:", error);
    }
   
  };

  return (
    <>
     {
      email ? (
    <div className="flex flex-col items-center h-screen mb-5 ml-5 mr-5">
        <h1 className="mt-10 font-serif  text-2xl mb-5">Welcome {name}!</h1>
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
            {recordingType && recording=== false && (
              <button
                className="rounded-lg bg-sky-400   hover:bg-sky-600 border text-white px-6 py-2 ml-2 mb-10"
                onClick={handleSaveRecording}
              >
                Save Recording
              </button>
            )}
          </div>
          {recordingFinished === true && (
          <video src={mediaBlobUrl} autoPlay muted controls></video>
      )}
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
     ): navigate('/login')
     }
     </>
  );
};

export default RecordScreen;
