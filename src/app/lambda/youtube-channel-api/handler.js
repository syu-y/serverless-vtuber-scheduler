import channelInfoRepository from 'src/db/dynamodb/channel-info';

export const youtubeChannelInfoApi = async (event, context, callback) => {
  try {
    const channels = await channelInfoRepository.getAllItems();
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, access_token',
      },
      body: JSON.stringify({ channels: channels }),
    };
    callback(null, response);
  } catch (error) {
    console.log(error);
    next(error);
  }
  return { statusCode: 200 };
};
