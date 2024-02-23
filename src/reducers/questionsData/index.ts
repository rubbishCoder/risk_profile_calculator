import { createSlice } from '@reduxjs/toolkit'

export const questionsData = createSlice({
  name: 'questionsData',
  initialState: {
    questions: [
      {
        question: `How would you describe your investment knowledge?`,
        options: [
          { id: 1, value: 'Novice', score: 1 },
          { id: 2, value: 'Intermediate', score: 2 },
          { id: 3, value: 'Advanced', score: 3 },
        ],
        selectedOption: null
      },
      {
        question: `Investment Duration?`,
        options: [
          { id: 1, value: 'Short-term (less than 1 year)', score: 1 },
          { id: 2, value: 'Medium-term (1-5 years)', score: 2 },
          { id: 3, value: 'Long-term (more than 5 years)', score: 3 },
        ],
        selectedOption: null
      },
      {
        question: `How comfortable are you with taking risks?`,
        options: [
          { id: 1, value: 'Very risk-averse', score: 1 },
          { id: 2, value: 'Somewhat risk-averse', score: 2 },
          { id: 3, value: 'Neutral Somewhat risk-tolerant', score: 3 },
          { id: 4, value: 'Very risk-tolerant', score: 4 },
        ],
        selectedOption: null
      },
      {
        question: `What percentage of your income are you willing to invest?`,
        options: [
          { id: 1, value: 'Less than 10%', score: 1 },
          { id: 2, value: '10-25%', score: 2 },
          { id: 3, value: '25-50%', score: 3 },
          { id: 4, value: 'More than 50%', score: 4 }
        ],
        selectedOption: null
      },
      {
        question: `How would you react to a sudden drop in the value of your investments?`,
        options: [
          { id: 1, value: 'Panic and sell immediately', score: 1 },
          { id: 2, value: 'Monitor closely and consider selling', score: 2 },
          { id: 3, value: 'Hold and wait for recovery', score: 3 },
          { id: 4, value: 'See it as a buying opportunity and invest more', score: 4 }
        ],
        selectedOption: null
      }
    ],
    selectedQuestionIndex: 0,
    riskProfileScore: 0,
  },
  reducers: {
    setQuestions: (state: any, action: any) => {
      state.questions = action.payload
    },
    setSelectedQuestionIndex: (state: any, action: any) => {
      state.selectedQuestionIndex = action.payload
    },
    setRiskProfileScore: (state: any, action: any) => {
      state.riskProfileScore = action.payload
    },
    resetQuestionDataState: (state: any, action: any) => {
      state.questions = state?.questions?.map((d: any) => ({ ...d, selectedOption: null }))
      state.selectedQuestionIndex = 0
      state.riskProfileScore = 0
    },
  }
})

export const {
  setQuestions,
  setSelectedQuestionIndex,
  setRiskProfileScore,
  resetQuestionDataState
}: any = questionsData.actions
