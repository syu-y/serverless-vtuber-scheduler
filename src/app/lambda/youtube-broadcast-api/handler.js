import broadcastInfoRepository from 'src/db/dynamodb/broadcast-info';

export const youtubeBroadcastInfoApi = async (event, context, callback) => {
  try {
    const broadcasts = await broadcastInfoRepository.getAllItems();
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, access_token',
      },
      body: JSON.stringify({ broadcasts: broadcasts }),
    };
    callback(null, response);
  } catch (error) {
    console.log(error);
    next(error);
  }
  return { statusCode: 200 };
};
