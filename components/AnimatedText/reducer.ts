import {AnimationDirection, AnimationState, TextState} from "./state";
import {TextActions} from "./actions";

interface action {
    type: TextActions,
    payload?: any,
}

export const reducer = (state: typeof TextState, action: action) => {
    const {type, payload} = action;

    switch (type) {
        case TextActions.Play:
            return {
                ...state,
                curState: AnimationState.Play,
            }
        case TextActions.Stop:
            return {
                ...state,
                curState: AnimationState.Stop,
            }
        case TextActions.ResponsiveDefault:
            return {
                ...state,
                text: state.defaultText,
                sentenceIndex: 0,
                letterIndex: state.defaultText.length,
                direction: AnimationDirection.Typing,
                curState: AnimationState.Stop,
            }
        case TextActions.setInfo:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}
