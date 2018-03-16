import React from "react";
import { List } from "antd";

const MessageList = ({ messages }) => (
  <List
    itemLayout="horizontal"
    dataSource={messages}
    renderItem={message => (
      <List.Item>
        <List.Item.Meta title={message.text} />
      </List.Item>
    )}
  />
);

export default MessageList;
