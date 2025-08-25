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