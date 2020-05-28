import axios from 'axios';
import dayjs from 'dayjs';
import { youtubeConfig } from 'src/api/youtube/config';

const endpoint = youtubeConfig.endpoint;
const apiKey = youtubeConfig.apiKey;

const generateUrlVideos = ({ channelId, maxResults, order }) =>
  `${endpoint}?key=${apiKey}&channelId=${channelId}&count=${maxResults}&order=${order}`;

const generateUrlBloadcast = ({
  channelId,
  maxResults,
  order,
  eventType,
  publishedAfter,
}) =>
  `${endpoint}?key=${apiKey}&channelId=${channelId}&count=${maxResults}&order=${order}&eventType=${eventType}&publishedAfter=${publishedAfter}`;

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
    })
  );
};

export default { getVideos, getBloadcast };
