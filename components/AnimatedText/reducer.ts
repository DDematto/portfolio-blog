import {AnimationState, TextState} from "./state";
import {TextActions} from "./actions";

interface action {
    payload: any,
    type: TextActions
}

export const reducer = (state: typeof TextState, action: action) => {
    const {type, payload} = action;

    switch (type) {
        case TextActions.Play:
            return {
                ...state,
                animation: AnimationState.Playing,
            }
        case TextActions.Stop:
            return {
                ...state,
                animation: AnimationState.Stopped,
            }
        case TextActions.ResponsiveDefault:
            return {
                ...state,
                animation: AnimationState.Stopped,
            }
        case TextActions.NextSentence:
            return {
                ...state,
                currentSentence: state.currentSentence + 1,
            }
        case TextActions.Typing:
            return {
                ...state,
                animation: AnimationState.Typing,
            }
        case TextActions.Deleting:
            return {
                ...state,
                animation: AnimationState.Deleting,
            }
        default:
            return state;
    }

}