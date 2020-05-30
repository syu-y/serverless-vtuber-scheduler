import axios from 'axios';
import youtubeConfig from 'src/api/youtube/youtube-config.json';
import youtubeKey from 'src/api/youtube/youtube-key.json';
// キー情報
const apiKey = youtubeKey.apiKey;
// APIのエンドポイントとリクエストパラメータ
// 動画検索API
const endpointVideoSearch = youtubeConfig.searchVideos.endpoint;
const partVideoSearch = youtubeConfig.searchVideos.part;
const typeVideoSearch = youtubeConfig.searchVideos.type;
// 配信情報取得API
console.log(youtubeConfig.getBroadcastSchedulez);
const endpointGetBroadcastSchedule =
  youtubeConfig.getBroadcastSchedule.endpoint;
console.log(endpointGetBroadcastSchedule);
const partGetBroadcastSchedule = youtubeConfig.getBroadcastSchedule.part;

// 動画取得APIのクエリ生成
const generateUrlVideos = ({ channelId, maxResults, order }) => {
  const url = `${endpointVideoSearch}?part=${partVideoSearch}&key=${apiKey}&type=${typeVideoSearch}&channelId=${channelId}&count=${maxResults}&order=${order}`;
  console.log(url);
  return url;
};

// 動画取得API（配信に絞って取得する）のクエリ生成
const generateUrlBroadcast = ({ channelId, maxResults, order, eventType }) => {
  const url = `${endpointVideoSearch}?part=${partVideoSearch}&key=${apiKey}&type=${typeVideoSearch}&channelId=${channelId}&count=${maxResults}&order=${order}&eventType=${eventType}`;
  console.log(url);
  return url;
};

// 配信情報取得API（配信時刻の取得）のクエリ生成
const generateUrlBroadcastSchedule = ({ videoId }) => {
  const url = `${endpointGetBroadcastSchedule}?part=${partGetBroadcastSchedule}&key=${apiKey}&id=${videoId}`;
  console.log(url);
  return url;
};

/**
 * チャンネルIDをキーにチャンネルの動画を最新の50件まで取得する
 * @param {*} channelId チャンネルID
 */
const getVideos = ({ channelId }) => {
  const maxResults = youtubeConfig.searchVideo.maxResults;
  const order = youtubeConfig.searchVideo.order;
  return axios.get(generateUrlVideos({ channelId, maxResults, order }));
};

/**
 * チャンネルIDをキーに配信予定の動画を取得する
 * @param {*} param0 channelId
 */
const getBroadcasts = ({ channelId }) => {
  const maxResults = youtubeConfig.searchVideos.maxResults;
  const order = youtubeConfig.searchVideos.order;
  const eventType = youtubeConfig.searchVideos.eventType;
  return axios.get(
    generateUrlBroadcast({
      channelId,
      maxResults,
      order,
      eventType,
    }),
  );
};

/**
 * 動画IDをキーに配信予定の動画の配信時刻を取得する
 * @param {*} param0 videoId
 */
const getBroadcastSchedule = (videoId) => {
  return axios.get(
    generateUrlBroadcastSchedule({
      videoId,
    }),
  );
};

export default { getVideos, getBroadcasts, getBroadcastSchedule };
