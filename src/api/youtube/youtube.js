import axios from 'axios';
import dayjs from 'dayjs';
import { youtubeConfig } from 'src/api/youtube/config';

const endpoint = youtubeConfig.endpoint;
const apiKey = youtubeConfig.apiKey;
const type = youtubeConfig.type;

const generateUrlVideos = ({ channelId, maxResults, order }) => {
  const url = `${endpoint}?part=snippet&key=${apiKey}&type=${type}&channelId=${channelId}&count=${maxResults}&order=${order}`;
  console.log(url);
  return url;
};

const generateUrlBloadcast = ({
  channelId,
  maxResults,
  order,
  eventType,
  publishedAfter,
}) => {
  const url = `${endpoint}?part=snippet&key=${apiKey}&type=${type}&channelId=${channelId}&count=${maxResults}&order=${order}&eventType=${eventType}&publishedAfter=${publishedAfter}`;
  console.log(url);
  return url;
};

/**
 * チャンネルIDをキーにチャンネルの動画を最新の50件まで取得する
 * @param {*} channelId チャンネルID
 */
const getVideos = ({ channelId }) => {
  const maxResults = youtubeConfig.maxResults;
  const order = youtubeConfig.order;
  return axios.get(generateUrlVideos({ channelId, maxResults, order }));
};

/**
 * チャンネルIDをキーに配信予定を取得する（取得日から1ヶ月先までの範囲）
 * @param {*} param0 channelId
 */
const getBloadcast = ({ channelId }) => {
  const maxResults = youtubeConfig.maxResults;
  const order = youtubeConfig.order;
  const eventType = youtubeConfig.eventType;
  const today = dayjs().format();
  const publishedAfter = today.add(1, 'month').format();
  return axios.get(
    generateUrlBloadcast({
      channelId,
      maxResults,
      order,
      eventType,
      publishedAfter,
    }),
  );
};

export default { getVideos, getBloadcast };
