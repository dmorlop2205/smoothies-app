import { atom } from 'nanostores';

export interface ChatData {
    id: number;
    name: string;
    avatar_url: string;
    is_group: boolean;
    last_message: string;
    unread_count: number;
    other_user_id?: number;
}

// Stores the currently selected chat. Unset means drawer is closed.
export const activeChat = atom<ChatData | null>(null);
export const isChatDrawerOpen = atom<boolean>(false);

export function openChat(chat: ChatData) {
    activeChat.set(chat);
    isChatDrawerOpen.set(true);
}

export function closeChat() {
    isChatDrawerOpen.set(false);
    // Optionally we can keep activeChat set so it animates nicely when closing
}
