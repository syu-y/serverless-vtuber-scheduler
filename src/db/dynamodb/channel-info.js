import { documentClient } from 'src/db/dynamodb/client';

const tableName = process.env.CHANNEL_INFO_TABLE;

// チャンネル情報の登録
const putItem = ({ channelId, name, iconUrl }) => {
  const params = {
    TableName: tableName,
    Item: { channelId, name, iconUrl },
  };

  console.log({ params });
  return documentClient.put(params).promise();
};

// チャンネルId全件取得
const getAllItems = () => {
  const params = { TableName: tableName };
  console.log(params);
  return documentClient.scan(params).promise();
};

export default { putItem, getAllItems };
