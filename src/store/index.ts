import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import studentsReducer from "./students/students.reducer";
import thunk from "redux-thunk";

export interface AppState {
  students: any;
}

export interface BaseModel {
  id: number;
}

const reducer = combineReducers<AppState>({
  students: studentsReducer
});

// @ts-ignore
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
