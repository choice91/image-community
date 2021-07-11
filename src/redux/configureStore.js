import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

export const history = createBrowserHistory();

// rootRreducer 생성
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history),
});

// Middleware
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금 어떤 환경인지 확인
const env = process.env.NODE_ENV;

// 개발환경에서 로거 사용하기
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// redux devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기
let store = (initialState) => createStore(rootReducer, enhancer);

export default store();
