import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

// Actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// Action Creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initailState = {
  image_url: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  uploading: false,
  preview: null,
};

function uploadImageFB(image) {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    console.log(`images/${new Date().getTime()}_${image.name}`);
    const _upload = storage.ref(`images/${image.name}`).put(image);

    // 업로드
    _upload
      .then((snapshot) => {
        console.log(snapshot);

        // 업로드한 파일의 다운로드 경로를 가져옴
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          dispatch(uploadImage(url));
        });
      })
      .catch((err) => {
        dispatch(uploading(false));
      });
  };
}

// Reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initailState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };
