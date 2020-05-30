import youtubeApi from 'src/api/youtube';
import { channelIdList } from 'src/app/constants/channel-id-list';
import channelInfoRepository from 'src/db/dynamodb/channel-info';

export const getChannelInfo = async () => {
  await Promise.all(
    channelIdList.map(async (channelId) => {
      try {
        // チャンネル情報を取得
        const apiResponse = await youtubeApi.getChannelInfo(channelId);
        console.log(apiResponse);
        if (!apiResponse.data) return;

        const allData = apiResponse.data.items[0];

        // 登録用のオブジェクト生成
        const channelInfo = {
          channelId: channelId,
          name: allData.snippet.title,
          iconUrl: allData.snippet.thumbnails.default.url,
        };

        // DBに登録
        channelInfoRepository.putItem(channelInfo);
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
