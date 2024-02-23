import questionsData, { questionsInitialState, resetQuestionDataState, setQuestions, setRiskProfileScore, setSelectedQuestionIndex } from "..";

describe('questionsData reducer', () => {
    it('should return the initial state', () => {
        expect(questionsData(undefined, { type: '' })).toEqual(questionsInitialState)
    });

    it('should change questions value in state', () => {
        const newQuestions = questionsInitialState?.questions?.map((d: any, i: any) => {
            if (i === 0) {
                return { ...d, selectedOption: { id: 1, value: 'Novice', score: 1 } }
            } else {
                return d
            }
        })
        expect(questionsData(questionsInitialState, setQuestions(newQuestions))).toEqual({
            ...questionsInitialState,
            questions: newQuestions
        })
    });

    it('should change selectedQuestionIndex value in state', () => {
        expect(questionsData(questionsInitialState, setSelectedQuestionIndex(1))).toEqual({
            ...questionsInitialState,
            selectedQuestionIndex: 1
        })
    });

    it('should change riskProfileScore value in state', () => {
        expect(questionsData(questionsInitialState, setRiskProfileScore(100))).toEqual({
            ...questionsInitialState,
            riskProfileScore: 100
        })
    });

    it('should reset modified questionsData state to initialState values', () => {
        const newQuestions = questionsInitialState?.questions?.map((d: any, i: any) => {
            return { ...d, selectedOption: d?.options[0] }
        })
        const modifiedQuestionsData = {
            questions: newQuestions,
            selectedQuestionIndex: 1,
            riskProfileScore: 100
        }
        expect(questionsData(modifiedQuestionsData, resetQuestionDataState())).toEqual(questionsInitialState)
    });
});