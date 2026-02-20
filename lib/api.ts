import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config.url.includes("/auth/login")) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const auth = {
    login: async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    },
    register: async (name: string, email: string, password: string) => {
        const response = await api.post("/auth/register", { name, email, password });
        return response.data;
    },
    updateProfile: async (data: any) => {
        const response = await api.post("/auth/onboarding", data);
        return response.data;
    },
    socialLogin: async (data: { name?: string | null, email?: string | null, provider: string, idToken?: string, providerUserId?: string }) => {
        const response = await api.post("/auth/social-login", data);
        return response.data;
    },
};

export const chat = {
    getMessages: async (id: string) => {
        const response = await api.get(`/chat/history/${id}`);
        return response.data;
    },
    sendMessage: async (message: string, sessionId?: string | null) => {
        const token = localStorage.getItem("token");
        const payload: any = { message };
        if (sessionId) {
            payload.sessionId = sessionId;
        }

        const response = await fetch(`${API_URL}chat/send-stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to send message: ${response.statusText}`);
        }

        return response;
    },
    streamChat: async (message: string, sessionId?: string | null) => {
        const token = localStorage.getItem("token");
        const payload: any = { message };
        if (sessionId) {
            payload.sessionId = sessionId;
        }

        const response = await fetch(`${API_URL}chat/send-stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to send message: ${response.statusText}`);
        }

        return response;
    },
    getChatSessions: async () => {
        const response = await api.get("/chat/sessions");
        return response.data;
    },

};

export default api;
