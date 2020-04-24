/*
For restoring sessions
*/

export function saveSessionId(sessionId) {
    localStorage.setItem("sessionId", sessionId);
};

export function revokeSessionId() {
    localStorage.removeItem("sessionId");
};

export function getSavedSession() {
    return localStorage.getItem("sessionId") || null;
};
