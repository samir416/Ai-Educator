import React, { useState, useEffect } from "react";
import "./VoiceInteraction.css";

export default function VoiceProfiles({ onStartConversation }) {

    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [editedName, setEditedName] = useState("");


    useEffect(() => {
        const saved =
            JSON.parse(localStorage.getItem("voiceProfiles")) || [];
        setProfiles(saved);
    }, []);

    const handleDelete = (id) => {
        const updated = profiles.filter(p => p.id !== id);
        setProfiles(updated);
        localStorage.setItem("voiceProfiles", JSON.stringify(updated));
        setSelectedProfile(null);
    };

    const handleUpdate = () => {

        const nameExists = profiles.some(
            p =>
                p.name.toLowerCase() === editedName.toLowerCase() &&
                p.id !== selectedProfile.id
        );

        if (nameExists) {
            alert("Profile name already exists!");
            return;
        }

        const updated = profiles.map(p =>
            p.id === selectedProfile.id
                ? { ...p, name: editedName }
                : p
        );

        setProfiles(updated);
        localStorage.setItem("voiceProfiles", JSON.stringify(updated));
        setSelectedProfile(null);
    };

    return (
        <div className="profiles-page">

            <h2>Your Voice Profiles</h2>

            {/* HORIZONTAL CARDS */}
            <div className="profiles-grid">
                {profiles.map(profile => (
                    <div
                        key={profile.id}
                        className="voice-profile-card"
                        onClick={() => {
                            setSelectedProfile(profile);
                            setEditedName(profile.name);
                        }}
                    >
                        <div className="profile-inner">

                            {/* IMAGE OR LETTER */}
                            {profile.photo &&
                                profile.photo.startsWith("data:") ? (
                                <img
                                    src={profile.photo}
                                    alt="dp"
                                    className="profile-image"
                                />
                            ) : (
                                <div className="avatar-fallback">
                                    {profile.photo ||
                                        profile.name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <p className="profile-name">
                                {profile.name}
                            </p>

                        </div>
                    </div>
                ))}
            </div>

            {/* POPUP */}
            {selectedProfile && (
                <div
                    className="popup-overlay"
                    onClick={() => setSelectedProfile(null)}
                >
                    <div
                        className="popup-card"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="avatar-preview">
                            {selectedProfile.photo &&
                                selectedProfile.photo.startsWith("data:") ? (
                                <img
                                    src={selectedProfile.photo}
                                    alt="dp"
                                />
                            ) : (
                                <div className="avatar-fallback">
                                    {selectedProfile.photo ||
                                        selectedProfile.name
                                            .charAt(0)
                                            .toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* AUDIO PLAYER (Profile Pic ke niche) */}
                        {selectedProfile.audio && (
                            <div style={{ marginTop: "12px", width: "100%" }}>
                                <audio
                                    controls
                                    style={{ width: "100%" }}
                                    src={selectedProfile.audio}
                                />
                            </div>
                        )}


                        <input
                            value={editedName}
                            onChange={(e) =>
                                setEditedName(e.target.value)
                            }
                            className="profile-input"
                        />

                        <div className="popup-buttons">

                            <button
                                className="update-btn"
                                onClick={() => {
                                    localStorage.setItem("updateProfileId", selectedProfile.id);
                                    setSelectedProfile(null);
                                    onStartConversation("update");
                                }}
                            >
                                Update
                            </button>

                            <button
                                className="start-btn"
                                onClick={() => {
                                    setSelectedProfile(null);
                                    onStartConversation("start");
                                }}
                            >
                                Start
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(selectedProfile.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
