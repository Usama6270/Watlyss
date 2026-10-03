'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/chat-widget').then((m) => m.ChatWidget), { ssr: false });
const AuthModal = dynamic(() => import('@/components/auth-modal'), { ssr: false });

export default function LazyGlobalWidgets() {
  return (
    <>
      <AuthModal />
      <ChatWidget />
    </>
  );
}
