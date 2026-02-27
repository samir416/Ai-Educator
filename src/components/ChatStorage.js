export const getSessions = () => {
  return JSON.parse(localStorage.getItem("chatSessions")) || [];
};

export const saveSessions = (sessions) => {
  localStorage.setItem("chatSessions", JSON.stringify(sessions));
};

export const clearSessions = () => {
  localStorage.removeItem("chatSessions");
};