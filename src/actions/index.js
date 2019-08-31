import { ADD_VIDEO, ADD_VIDEOS, REMOVE_VIDEO, REMOVE_ALL_VIDEOS, VIDEO_PROGRESS, VIDEO_COMPLETE } from "./types";
import { ipcRenderer } from 'electron';
// TODO: Communicate to MainWindow process that videos
// have been added and are pending conversion
export const addVideos = videos => dispatch => {
  ipcRenderer.send('videos:added', videos);
  ipcRenderer.on('metadata:complete',(event, videosWithData) => {
    dispatch({type : ADD_VIDEOS,payload: videosWithData});
  })
};


export const convertVideos = (videos) => (dispatch) => {
  ipcRenderer.send('conversion:start', videos);
  ipcRenderer.on('conversion:progress',(event, {video, timemark}) => {
    dispatch({type : VIDEO_PROGRESS,payload: {...video, timemark}});
  })
  ipcRenderer.on('conversion:complete',(event, {video, outputPath}) => {
    dispatch({type : VIDEO_COMPLETE,payload: {...video, outputPath}});
  })

};

export const showInFolder = outputPath => dispatch => {
  ipcRenderer.send('file:openlocation', outputPath);
};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: "" }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
