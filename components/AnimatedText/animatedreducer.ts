export enum Action {
    TYPING,
    DELETING,
    ADD_LETTER,
    DELETE_LETTER,
    SET_DELAY,
}

interface IState {
    text: string,
    sentences: string[],
    sentenceIndex: number,
    letterIndex: number,
    direction: Action,
    delay: boolean,
}


export const reducer = (state: IState, action: any) => {
    const {type, payload} = action;

    switch (type) {
        case Action.TYPING:
            return {
                ...state,
                direction: Action.TYPING,
                sentenceIndex: (state.sentenceIndex + 1) % state.sentences.length,
                delay: true
            }
        case Action.DELETING:
            return {
                ...state,
                direction: Action.DELETING,
                delay: true
            }
        case Action.ADD_LETTER:
            return {
                ...state,
                text: state.text + state.sentences[state.sentenceIndex][state.letterIndex],
                letterIndex: state.letterIndex + 1
            }
        case Action.DELETE_LETTER:
            return {
                ...state,
                text: state.text.slice(0, -1),
                letterIndex: state.letterIndex - 1
            }
        case Action.SET_DELAY:
            return {
                ...state,
                delay: payload
            }
        default:
            return state
    }
}

// React Component for the animated text //
export interface IAnimatedText {
    sentences: string[],
    characterTypeSpeed?: number,
    characterDeleteSpeed?: number,
    delayTime?: number,
    symbol?: string
}

export const initialState: IState = {
    text: '',
    sentences: [],
    sentenceIndex: 0,
    letterIndex: 0,
    direction: Action.TYPING,
    delay: false
}
