export enum AnimationState {
    Stop,
    Play,
}

export enum AnimationDirection {
    Typing,
    Deleting,
}

export const TextState = {
    curState: AnimationState.Play,
    text: '',
    defaultText: '',
    sentences: [] as string[],
    sentenceIndex: 0,
    letterIndex: 0,
    direction: AnimationDirection.Typing as AnimationDirection | null,
}