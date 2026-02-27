import React, { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import "./VoiceInteraction.css";
import { useNavigate } from "react-router-dom";


export default function VoiceInteraction({onStartFull}) {
    const navigate = useNavigate();

    const [tempAudio, setTempAudio] = useState(null);
    const [recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    let localChunks = [];
    const [recordedAudio, setRecordedAudio] = useState(null);


    // ✅ NEW ADDITION (update mode detect)
    const updateProfileId = localStorage.getItem("updateProfileId");
    const [showUpdateDone, setShowUpdateDone] = useState(false);


    useEffect(() => {
        let interval;

        if (recording && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        if (timer === 0 && recording) {
            stopRecording();
            setTimer(10);
        }

        return () => clearInterval(interval);
    }, [recording, timer]);

   const handleRecord = async () => {

    if (!recording) {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const recorder = new MediaRecorder(stream);

        let localChunks = [];

        recorder.ondataavailable = (event) => {
            localChunks.push(event.data);
        };

        recorder.onstop = () => {

            const blob = new Blob(localChunks, { type: "audio/webm" });

            const reader = new FileReader();

            reader.onloadend = () => {

                const audioBase64 = reader.result;
                setTempAudio(audioBase64);  

                const profiles =
                    JSON.parse(localStorage.getItem("voiceProfiles")) || [];

                if (updateProfileId) {

                    const updated = profiles.map(p =>
                        p.id == updateProfileId
                            ? { ...p, audio: audioBase64 }
                            : p
                    );

                    localStorage.setItem("voiceProfiles", JSON.stringify(updated));
                    localStorage.removeItem("updateProfileId");

                    setShowUpdateDone(true);

                } else {
                    setShowPopup(true);
                }
            };

            reader.readAsDataURL(blob);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
        setTimer(10);

    } else {
        stopRecording();
    }
};


// ✅ UPDATED stopRecording FUNCTION
const stopRecording = () => {
    setRecording(false);

    if (mediaRecorder) {
        mediaRecorder.stop();
    }
};



const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewPhoto(reader.result);
        };

        reader.readAsDataURL(file);
    }
};

const handleSave = () => {

    if (!profileName.trim()) return;

    if (!tempAudio) {
        alert("Please record voice first!");
        return;
    }

    const profiles =
        JSON.parse(localStorage.getItem("voiceProfiles")) || [];

    const nameExists = profiles.some(
        p => p.name.toLowerCase() === profileName.toLowerCase()
    );

    if (nameExists) {
        alert("Profile name already exists!");
        return;
    }

    const newProfile = {
        id: Date.now(),
        name: profileName,
        photo: previewPhoto
            ? previewPhoto
            : profileName.charAt(0).toUpperCase(),
        audio: tempAudio   // ✅ Guaranteed audio
    };

    profiles.push(newProfile);
    localStorage.setItem("voiceProfiles", JSON.stringify(profiles));

    // reset
    setProfileName("");
    setPreviewPhoto(null);
    setTempAudio(null);
    setShowPopup(false);
};

return (
    <div className="voice-page">

        <div className="voice-header">
            <Mic size={22} />
            <h1>Voice Interaction Setup</h1>
        </div>

        <div className="voice-card">

            {recording && <div className="timer">{timer}s</div>}

            <div className={`big-mic ${recording ? "recording" : ""}`}>
                <Mic size={60} />
            </div>

            <div className="voice-buttons">

                <button className="start-btn" onClick={onStartFull}>
                    Start Conversation
                </button>

                <button
                    className="record-btn"
                    onClick={handleRecord}
                >
                    {recording
                        ? `Stop Recording (${timer}s)`
                        : "Record Voice (10s)"}
                </button>

            </div>

        </div>

        {/* NORMAL CREATE PROFILE POPUP */}
        {showPopup && (
            <div
                className="popup-overlay"
                onClick={() => setShowPopup(false)}
            >
                <div
                    className="popup-card"
                    onClick={(e) => e.stopPropagation()}
                >

                    <h3>Create Voice Profile</h3>

                    <div className="avatar-preview">
                        {previewPhoto ? (
                            <img src={previewPhoto} alt="profile" />
                        ) : (
                            <div className="avatar-fallback">
                                {profileName
                                    ? profileName.charAt(0).toUpperCase()
                                    : "?"}
                            </div>
                        )}
                    </div>

                    <label className="upload-label">
                        Upload Photo (Optional)
                        <input
                            type="file"
                            hidden
                            onChange={handlePhotoUpload}
                        />
                    </label>

                    <input
                        className="profile-input"
                        placeholder="Enter Profile Name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                    />

                    <div className="popup-buttons">
                        <button
                            className="cancel-btn"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="done-btn"
                            onClick={handleSave}
                        >
                            Done
                        </button>
                    </div>

                </div>
            </div>
        )}

        {/* ✅ UPDATE DONE POPUP */}
        {showUpdateDone && (
            <div
                className="popup-overlay"
                onClick={() => setShowUpdateDone(false)}
            >
                <div
                    className="popup-card"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ fontSize: "60px", color: "#22c55e" }}>
                        ✔
                    </div>

                    <h3>Voice Updated Successfully</h3>

                    <button
                        className="done-btn"
                        onClick={() => {
                            setShowUpdateDone(false);
                            window.dispatchEvent(new Event("backToProfiles"));

                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        )}

    </div>
);
}
