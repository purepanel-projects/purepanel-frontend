//获取登录用户的权限
import type Res from "@/types/Res.ts";
import type {AiChatbotConversation} from "@/types/AiChatbotConversation.ts";
import request from "@/api/request.ts";
import type {AiChatbotChatRecord} from "@/types/AiChatbotChatRecord.ts";

//获取会话列表
export function listChatbotConversationApi(): Promise<Res<AiChatbotConversation[]>> {
    return request.get('/chatbot/listConversation')
}

//获取会话记录
export function listChatbotChatRecordApi(conversationId: string): Promise<Res<AiChatbotChatRecord[]>> {
    return request.get(`/chatbot/listChatRecord?conversationId=${conversationId}`)
}

export interface AIChatReq {
    question: string;
    conversationId: string;
    modelName?: string;
}

// 从 vite 环境变量中读取 baseURL
const baseURL = import.meta.env.VITE_API_BASE

export async function streamChatApi(req: AIChatReq, onMessage: (message: string) => void) {
    let controller = new AbortController();
    const loginInfoStr = localStorage.getItem("loginInfo")
    if (!loginInfoStr) {
        return
    }
    const response = await fetch(`${baseURL}/chatbot/chat`, {
        method: "POST",
        headers: {
            'Login-Code': JSON.parse(loginInfoStr).loginCode,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
        signal: controller.signal,
    });
    let buffer = "";
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    while (true) {
        const {value, done} = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {stream: true});
        //按双换行分割消息块
        let parts = buffer.split("\n\n");
        //最后一部分可能没结束，保留在 buffer
        buffer = parts.pop()!;

        for (let part of parts) {
            //去掉前缀 "data:" 并 trim
            if (part.startsWith("data:")) {
                const message = part.replace(/^data:/, "").trim();
                if (message && message !== "[DONE]") {
                    onMessage(message);
                }
            }
        }
    }
}