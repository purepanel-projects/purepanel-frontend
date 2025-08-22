//获取登录用户的权限
import type Res from "@/types/Res.ts";
import type {AiChatbotConversation} from "@/types/AiChatbotConversation.ts";
import request from "@/api/request.ts";

export function listChatbotConversationApi(): Promise<Res<AiChatbotConversation[]>> {
    return request.get('/chatbot/listConversation')
}