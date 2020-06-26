import axios from 'axios';
import youtubeConfig from 'src/api/youtube/youtube-config.json';
import youtubeKey from 'src/api/youtube/youtube-key.json';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

const setDate = (now, hour, min, sec) => {
  return dayjs()
    .year(now.year())
    .month(now.month())
    .date(now.date())
    .hour(hour)
    .minute(min)
    .second(sec);
};

const now = dayjs();
const am0 = setDate(now, 0, 0, 0);
const am6 = setDate(now, 6, 0, 0);
const pm12 = setDate(now, 12, 0, 0);
const pm18 = setDate(now, 18, 0, 0);

console.log('now : ', now.format());
const isAfterAm0 = dayjs(now).isAfter(am0);
const isAfterAm6 = dayjs(now).isAfter(am6);
const isAfterPm12 = dayjs(now).isAfter(pm12);
const isAfterPm18 = dayjs(now).isAfter(pm18);

// キー情報
const apiKeyForVideos = isAfterPm18
  ? youtubeKey.apiKeyForVideosPm18
  : isAfterPm12
  ? youtubeKey.apiKeyForVideosPm12
  : isAfterAm6
  ? youtubeKey.apiKeyForVideosAm6
  : youtubeKey.apiKeyForVideosAm0;

console.log(apiKeyForVideos);

const apiKeyForBroadcastSchedule = youtubeKey.apiKeyForBroadcastSchedule;
const apiKeyForChannelInfo = youtubeKey.apiKeyForChannelInfo;

// APIのエンドポイントとリクエストパラメータ
// 動画検索API
const endpointVideoSearch = youtubeConfig.searchVideos.endpoint;
const partVideoSearch = youtubeConfig.searchVideos.part;
const typeVideoSearch = youtubeConfig.searchVideos.type;
// 配信情報取得API
const endpointGetBroadcastSchedule =
  youtubeConfig.getBroadcastSchedule.endpoint;
const partGetBroadcastSchedule = youtubeConfig.getBroadcastSchedule.part;
// チャンネル情報取得API
const endpointGetChannelInfo = youtubeConfig.getChannelInfo.endpoint;
const partGetChannelInfo = youtubeConfig.getChannelInfo.part;

// 動画取得APIのクエリ生成
const generateUrlVideos = ({ channelId, maxResults, order }) => {
  const url = `${endpointVideoSearch}?part=${partVideoSearch}&key=${apiKeyForVideos}&type=${typeVideoSearch}&channelId=${channelId}&count=${maxResults}&order=${order}`;
  console.log(url);
  return url;
};

// 動画取得API（配信に絞って取得する）のクエリ生成
const generateUrlBroadcast = ({ channelId, maxResults, order, eventType }) => {
  const url = `${endpointVideoSearch}?part=${partVideoSearch}&key=${apiKeyForVideos}&type=${typeVideoSearch}&channelId=${channelId}&count=${maxResults}&order=${order}&eventType=${eventType}`;
  console.log(url);
  return url;
};

// 配信情報取得API（配信時刻の取得）のクエリ生成
const generateUrlBroadcastSchedule = ({ videoId }) => {
  const url = `${endpointGetBroadcastSchedule}?part=${partGetBroadcastSchedule}&key=${apiKeyForBroadcastSchedule}&id=${videoId}`;
  console.log(url);
  return url;
};

// チャンネル情報取得APIのクエリ生成
const generateUrlChannelInfo = ({ channelId }) => {
  const url = `${endpointGetChannelInfo}?part=${partGetChannelInfo}&key=${apiKeyForChannelInfo}&id=${channelId}`;
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
  return axios.get(generateUrlBroadcastSchedule({ videoId }));
};

/**
 * チャンネルIDをキーにチャンネル情報を取得する
 * @param {*} param0 channelId
 */
const getChannelInfo = (channelId) => {
  return axios.get(generateUrlChannelInfo({ channelId }));
};

export default {
  getVideos,
  getBroadcasts,
  getBroadcastSchedule,
  getChannelInfo,
};
