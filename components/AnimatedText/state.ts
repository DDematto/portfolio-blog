export enum AnimationState {
    Playing,
    Stopped,

    Typing,
    Deleting,
}


export const TextState = {
    text: '',
    default: '',
    sentences: [],
    currentSentence: 0,
    currentLetter: 0,
    animation: AnimationState.Stopped,
}