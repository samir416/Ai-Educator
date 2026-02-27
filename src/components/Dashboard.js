import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Setting from "./Setting";
import QuizEntrance from "./QuizEntrance";
import {
    Video,
    Clock,
    Brain,
    TrendingUp,
    BookOpen,
    Globe,
    User,
    Menu
} from "lucide-react";

import {
    FaTachometerAlt,
    FaBookOpen,
    FaFolderOpen,
    FaListUl,
    FaComments,
    FaMicrophone,
    FaClipboardList,
    FaUser as FaUserIcon,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import CreateLecture from "./CreateLecture";
import MyLectures from "./MyLectures";
import LecturePlayList from "./LecturePlayList";
import AIDoubtSolver from "./AIDoubtSolver";
import VoiceInteractionSetup from "./VoiceInteraction";
import VoiceConversation from "./VoiceConversation";
import VoiceProfiles from "./VoiceProfile";






export default function Dashboard() {
    const navigate = useNavigate();

    const [page, setPage] = useState("home");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
    const [voiceFullScreen, setVoiceFullScreen] = useState(false);
    const [voiceSource, setVoiceSource] = useState(null);


    /* 
       HANDLE RESPONSIVE LOGIC
     */

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth > 1024;
            setIsDesktop(desktop);

            if (desktop) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (!isDesktop) {
            setSidebarOpen(false);
        }
    };

    const stats = [
        { icon: <Video size={22} />, title: "Total Lectures", value: "48" },
        { icon: <Clock size={22} />, title: "Study Hours", value: "32.5" },
        { icon: <Brain size={22} />, title: "Quiz Score Avg", value: "91%" },
        { icon: <TrendingUp size={22} />, title: "Weekly Streak", value: "12" },
    ];

    const lectures = [
        {
            title: "Quantum Mechanics Fundamentals",
            duration: "12 min",
            category: "Physics",
            progress: 75
        }
    ];

    useEffect(() => {

        const handleBack = () => {
            setPage("profiles");
            setVoiceFullScreen(false);
        };

        window.addEventListener("backToProfiles", handleBack);

        return () => {
            window.removeEventListener("backToProfiles", handleBack);
        };

    }, []);
    useEffect(() => {

        const goToConversation = () => {
            setPage("voice");
            setVoiceFullScreen(true);
        };

        window.addEventListener("goToConversation", goToConversation);

        return () => {
            window.removeEventListener("goToConversation", goToConversation);
        };

    }, []);


    return (
        <div className="dashboard-layout">

            {/* Overlay only mobile */}
            {!isDesktop && sidebarOpen && (
                <div
                    className="overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            {!voiceFullScreen && (
                <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>

                    <div className="logo">
                        <div className="logo-box">✦</div>
                        Edumation AI
                    </div>

                    <ul>
                        <li
                            className={page === "home" ? "active" : ""}
                            onClick={() => handlePageChange("home")}
                        >
                            <FaTachometerAlt className="menu-icon" />
                            Dashboard
                        </li>

                        <li
                            className={page === "create" ? "active" : ""}
                            onClick={() => handlePageChange("create")}
                        >
                            <FaBookOpen className="menu-icon" />
                            Create Lecture
                        </li>

                        <li
                            className={page === "lectures" ? "active" : ""}
                            onClick={() => handlePageChange("lectures")}
                        >
                            <FaFolderOpen className="menu-icon" />
                            My Lectures
                        </li>


                        <li
                            className={page === "playlist" ? "active" : ""}
                            onClick={() => handlePageChange("playlist")}
                        >
                            <FaListUl className="menu-icon" />
                            Lecture Playlist
                        </li>


                        <li
                            className={page === "doubt" ? "active" : ""}
                            onClick={() => handlePageChange("doubt")}
                        >
                            <FaComments className="menu-icon" />
                            AI Doubt Solver
                        </li>

                        <li
                            className={page === "voice" ? "active" : ""}
                            onClick={() => handlePageChange("voice")}
                        >
                            <FaMicrophone className="menu-icon" />
                            Voice Interaction
                        </li>

                        <li
                            className={page === "quiz" ? "active" : ""}
                            onClick={() => handlePageChange("quiz")}
                        >
                            <FaClipboardList className="menu-icon" />
                            Quiz Center
                        </li>

                        <li
                            className={page === "profiles" ? "active" : ""}
                            onClick={() => handlePageChange("profiles")}
                        >
                            <FaUserIcon className="menu-icon" />
                            Profiles
                        </li>



                        <li
                            className={page === "setting" ? "active" : ""}
                            onClick={() => handlePageChange("setting")}
                        >
                            <FaCog className="menu-icon" />
                            Settings
                        </li>
                    </ul>


                    <div className="logout">
                        <FaSignOutAlt className="menu-icon" />
                        Logout
                    </div>

                </div>
            )}

            {/* Main */}
            <div className="dashboard">

                {/* ===== GLOBAL HEADER ===== */}
                <div className="top-header">

                    <div className="header-left">

                        {!isDesktop && !sidebarOpen && (
                            <div
                                className="menu-toggle"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={28} />
                            </div>
                        )}

                        <div>
                            <h1>
                                Welcome back, <span>Scholar!</span>
                            </h1>
                            <p className="sub-text">
                                Continue your learning journey with AI-powered education
                            </p>
                        </div>

                    </div>

                    <div className="top-right">
                        <div className="language">
                            <Globe size={16} />
                            <select>
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                            </select>
                        </div>

                        <div
                            className="profile-icon"
                            onClick={() => navigate("/profile")}
                        >
                            <User size={18} />
                        </div>


                        <button
                            className="create-btn"
                            onClick={() => handlePageChange("create")}
                        >
                            <BookOpen size={16} />
                            Create New Lecture
                        </button>
                    </div>

                </div>

                <div className="divider"></div>

                {/* ===== PAGE CONTENT ===== */}
                {page === "home" && (
                    <>
                        <div className="stats-grid">
                            {stats.map((item, index) => (
                                <div className="stat-card" key={index}>
                                    <div className="stat-icon">{item.icon}</div>
                                    <div>
                                        <h2>{item.value}</h2>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="divider"></div>

                        <div className="dashboard-content">

                            <div className="continue-card">
                                <h3>Continue Learning</h3>
                                <p className="small-text">Pick up where you left off</p>

                                {lectures.map((lecture, index) => (
                                    <div key={index} className="lecture-card">
                                        <h4>{lecture.title}</h4>
                                        <p className="lecture-meta">
                                            {lecture.duration} • {lecture.category}
                                        </p>

                                        <div className="progress-bar">
                                            <div
                                                className="progress"
                                                style={{ width: `${lecture.progress}%` }}
                                            />
                                        </div>

                                        <span className="progress-text">
                                            {lecture.progress}%
                                        </span>
                                    </div>
                                ))}

                                <button className="view-all-btn">
                                    <span>View All Lectures</span>
                                    <span className="arrow">→</span>
                                </button>
                            </div>

                            <div className="right-section">

                                <div className="quick-card">
                                    <h3>Quick Actions</h3>
                                    <button className="quick-btn">Create Lecture</button>
                                    <button className="quick-btn">Ask AI Tutor</button>
                                    <button className="quick-btn">Take Quiz</button>
                                </div>

                                <div className="quiz-card">
                                    <h3>Recent Quiz Scores</h3>

                                    <div className="quiz-item">
                                        <div>
                                            <h4>Mathematics</h4>
                                            <p>25 questions</p>
                                        </div>
                                        <span>92%</span>
                                    </div>

                                    <div className="quiz-item">
                                        <div>
                                            <h4>Physics</h4>
                                            <p>20 questions</p>
                                        </div>
                                        <span>88%</span>
                                    </div>

                                    <div className="quiz-item">
                                        <div>
                                            <h4>Chemistry</h4>
                                            <p>30 questions</p>
                                        </div>
                                        <span>95%</span>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

                {page === "create" && <CreateLecture />}
                {page === "lectures" && <MyLectures />}
                {page === "playlist" && <LecturePlayList />}
                {page === "setting" && <Setting />}
                {page === "doubt" && <AIDoubtSolver />}
                {page === "quiz" && <QuizEntrance />}
                {page === "voice" && !voiceFullScreen && (
                    <VoiceInteractionSetup
                        onStartFull={() => {
                            setVoiceSource("interaction");
                            setPage("voice");
                            setVoiceFullScreen(true);
                            setSidebarOpen(false);
                        }}
                    />
                )}
                {page === "voice" && voiceFullScreen && (
                    <VoiceConversation
                        onBack={() => {
                            if (voiceSource === "profiles") {
                                setPage("profiles");
                            } else {
                                setPage("voice");
                            }

                            setVoiceFullScreen(false);
                        }}
                    />
                )}

                {page === "profiles" && (
                    <VoiceProfiles
                        onStartConversation={(source) => {

                            // 👇 Always mark source correctly
                            setVoiceSource("profiles");

                            setPage("voice");

                            if (source === "update") {
                                setVoiceFullScreen(false);   // 👉 VoiceInteraction
                            } else {
                                setVoiceFullScreen(true);    // 👉 VoiceConversation
                            }
                        }}
                    />
                )}

            </div>

        </div>
    );
}
