import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import scoreReducer from './score_reducer';

export default createStore(scoreReducer);