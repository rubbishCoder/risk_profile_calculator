import { configureStore } from '@reduxjs/toolkit';
import questionsData from './questionsData';

const store = configureStore({
    reducer: {
        questionsData: questionsData
    }
})

export default store;