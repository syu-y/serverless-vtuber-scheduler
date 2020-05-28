import dayjs from 'dayjs';
import youtubeApi from 'src/api/youtube';

export const getYoutubeBloadcast = async () => {
  await Promise.all(
    connpassUserList.map(async (channelId) => {
      try {
        const response = await youtubeApi.getYoutubeBloadcast({ channelId });
        console.log(response);
        if (!response.data) return;

        const date = dayjs().format('YYYY-MM-DD');
        const bloadcasts = response.data.events.map((element) => ({}));

        await connpassHistoryRepository.putItem({ date, userId, events });
      } catch (error) {
        console.log(error);
      }
      return { statusCode: 200 };
    }),
  );
};
