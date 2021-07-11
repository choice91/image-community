import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

import { firestore, storage } from "../../shared/firebase";

// Actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// Action Creators
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

// 게시글 하나에 어떤 정보들이 있어야하는지 만들어둠
const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: "gildong",
  //   user_profile: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  // },
  image_url: "https://t1.daumcdn.net/cfile/tistory/99BDFD395CE56D3425",
  contents: "",
  comment_cnt: 0,
  insert_date: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    // state에서 페이징 정보 가져오기
    let _paging = getState().post.paging;

    // 시작정보가 기록되었는데 다음 가져올 데이터가 없으면 그냥 return
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));

    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_date", "desc");

    if (start) {
      query = query.startAt(start);
    }

    // 사이즈보다 1크게 가져와야 함
    // 3개씩 끊어서 보여준다고 할 때, 4개를 가져올 수 있다면 -> 다음 페이지가 있다는 뜻
    // 만약 4개 미만이라면 다음페이지는 없다!
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        // 새로운 페이징 정보를 만들어준다.
        // 시작점에는 새로 가져온 정보의 시작점을 넣고
        // next에는 마지막 항목을 넣는다.
        // next가 다음 리스트를 호출 할 때 start 파라미터로 넘어온다.
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          // 아래 주석 처리를 한 것과 같은 역할을 한다. reduce를 이용해 구현한 코드
          // ["comment_cnt", "contents", ...]
          let _post = doc.data();
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });
        post_list.pop(); // (페이징 처리를 위해) 마지막 요소는 지움
        // console.log(post_list);
        dispatch(setPost(post_list, paging));
      });

    // postDB.get().then((docs) => {
    //   let post_list = [];

    //   docs.forEach((doc) => {
    //     let _post = doc.data();
    //     let post = Object.keys(_post).reduce(
    //       (acc, cur) => {
    //         if (cur.indexOf("user_") !== -1) {
    //           return {
    //             ...acc,
    //             user_info: { ...acc.user_info, [cur]: _post[cur] },
    //           };
    //         }
    //         return { ...acc, [cur]: _post[cur] };
    //       },
    //       { id: doc.id, usre_info: {} }
    //     );
    //     post_list.push(post);
    //   });
    //   dispatch(setPost(post_list));
    // });

    return;

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {
        console.log(doc.id, doc.data());
        let _post = doc.data();
        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          contents: _post.contents,
          image_url: _post.image_url,
          comment_cnt: _post.comment_cnt,
          insert_date: _post.insert_date,
        };
        post_list.push(post);
      });
    });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    // console.log(_post);
    const _image = getState().image.preview;
    // console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            // dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            // console.log(url);

            postDB
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                let post = { user_info, ..._post, id: doc.id, image_url: url }; // Firestore에 정보 추가
                dispatch(addPost(post));
                // console.log(post);
                history.replace("/");
                dispatch(imageActions.setPreview(null));
              })
              .catch((err) => {
                window.alert("포스트 작성에 실패했습니다.");
                console.log("Post 작성 실패", err);
              });
          });
      })
      .catch((err) => {
        window.alert("이미지 업로드에 실패했습니다.");
        console.log(err);
      });

    return;

    postDB
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = { user_info, ..._post, id: doc.id }; // Firestore에 정보 추가
        dispatch(addPost(post));
        // console.log(post);
        history.replace("/");
      })
      .catch((err) => {
        console.log("Post 작성 실패", err);
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다.");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    console.log(_post);

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user_id;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            return url;
          });
        })
        .then((url) => {
          postDB
            .doc(post_id)
            .update({ ...post, image_url: url })
            .then((doc) => {
              dispatch(editPost(post_id, { ...post, image_url: url }));
              history.replace("/");
            });
        })
        .catch((err) => {
          window.alert("이미지 업로드에 문제가 있습니다.");
          console.log(err);
        });
    }
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(setPost([post], { start: null, next: null, size: 3 }));
      });
  };
};

const deletePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    // id가 없으면 return!
    if (!id) {
      window.alert("삭제할 수 없는 게시글이에요!");
      return;
    }

    const postDB = firestore.collection("post");

    // 게시글 id로 선택해서 삭제하기!
    postDB
      .doc(id)
      .delete()
      .then((res) => {
        dispatch(deletePost(id));
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.post_list;
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            // 중복됐을 때
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        if (idx !== -1) {
          // 배열에서 idx 위치의 요소 1개를 지웁니다.
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

// Action Creator Export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPostFB,
  getOnePostFB,
  deletePostFB,
};

export { actionCreators };
