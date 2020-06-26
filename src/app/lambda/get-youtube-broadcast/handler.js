import dayjs from 'dayjs';
import youtubeApi from 'src/api/youtube';
import channelInfoRepository from 'src/db/dynamodb/channel-info';
import broadcastInfoRepository from 'src/db/dynamodb/broadcast-info';

export const getYoutubeBloadcast = async () => {
  // チャンネル情報全件取得
  const dbResponse = await channelInfoRepository.getAllItems();
  const channelInfoList = dbResponse.Items;
  console.log(channelInfoList);
  // チャンネルIdを抽出してリスト化
  const channelIdList = channelInfoList.map((item) => item.channelId);
  console.log(channelIdList);

  await Promise.all(
    // チャンネルIDごとに動画情報を取得
    channelIdList.map(async (channelId) => {
      try {
        // 動画情報を取得
        const apiResponse = await youtubeApi.getBroadcasts({ channelId });
        console.log(apiResponse);
        if (!apiResponse.data) return;

        // 配信情報のリスト生成
        const broadcasts = apiResponse.data.items.map((broadcast) => {
          return {
            channelId: channelId,
            videoId: broadcast.id.videoId,
            title: broadcast.snippet.title,
            thumbnailUrl: broadcast.snippet.thumbnails.medium.url,
          };
        });

        // 動画IDをキーに各動画の配信日を取得する

        await Promise.all(
          broadcasts.map(async (broadcast) => {
            const apiResponse = await youtubeApi.getBroadcastSchedule(
              broadcast.videoId,
            );
            if (!apiResponse.data) return;

            // 配信日取得
            const date = dayjs(
              apiResponse.data.items[0].liveStreamingDetails.scheduledStartTime,
            );

            // 配信日がlambda動作日以降の場合、Dynamoに格納
            const today = dayjs().format();
            if (date.isAfter(today)) {
              const broadcastDate = date.format();
              // 登録情報に配信日を追加
              broadcast = { ...broadcast, broadcastDate };
              console.log(broadcast);
              // DBに登録
              await broadcastInfoRepository.putItem(broadcast);
            }
          }),
        );
      } catch (error) {
        console.log(error);
        return {
          statusCode: error.statusCode || 500,
          body: error.message,
        };
      }
    }),
  );
  return { statusCode: 200 };
};
