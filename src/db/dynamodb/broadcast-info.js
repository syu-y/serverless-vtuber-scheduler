import { documentClient } from 'src/db/dynamodb/client';

const tableName = process.env.BROADCAST_INFO_TABLE;

// 配信情報の登録
const putItem = ({
  channelId,
  videoId,
  title,
  thumbnailUrl,
  broadcastDate,
}) => {
  const params = {
    TableName: tableName,
    Item: { channelId, videoId, title, thumbnailUrl, broadcastDate },
  };

  console.log({ params });
  return documentClient.put(params).promise();
};

// 動画情報全件取得
const getAllItems = () => {
  const params = { TableName: tableName };
  console.log(params);
  return documentClient.scan(params).promise();
};

export default { putItem, getAllItems };
