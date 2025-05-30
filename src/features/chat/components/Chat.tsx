import React, { useEffect, useState } from 'react';
import { Input, Button, List, Typography, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useCentrifuge } from '../../../shared/hooks/useCentrifuge';
import { LoadingState } from '../../../uikit/LoadingState';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const MessageList = styled(List<Message>)`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
`;

interface MessageCardProps {
  $isOwn: boolean;
}

const MessageCard = styled(Card)<MessageCardProps>`
  margin-bottom: 8px;
  max-width: 80%;
  ${({ $isOwn }) => $isOwn && `
    margin-left: auto;
    background: #e6f7ff;
  `}
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatProps {
  channel: string;
  username: string;
}

export const Chat: React.FC<ChatProps> = ({ channel, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { subscribe, publish } = useCentrifuge({
    url: process.env.VITE_CENTRIFUGE_URL || 'ws://localhost:8000/connection/websocket',
    onConnect: () => setIsConnected(true),
    onDisconnect: () => setIsConnected(false),
    onError: (error) => console.error('Centrifuge error:', error),
  });

  useEffect(() => {
    const unsubscribe = subscribe(channel, (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      unsubscribe();
    };
  }, [channel, subscribe]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: username,
      timestamp: Date.now(),
    };

    try {
      await publish(channel, message);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!isConnected) {
    return <LoadingState type="spinner" />;
  }

  return (
    <ChatContainer>
      <Title level={3}>Chat: {channel}</Title>
      <MessageList
        dataSource={messages}
        renderItem={(message) => (
          <List.Item>
            <MessageCard
              $isOwn={message.sender === username}
              size="small"
            >
              <div>
                <Text strong>{message.sender}</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </div>
              <div>{message.text}</div>
            </MessageCard>
          </List.Item>
        )}
      />
      <InputContainer>
        <TextArea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend().then();
            }
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};
