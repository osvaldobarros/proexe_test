interface Action<TAction, TPayload> {
    type: TAction;
    payload?: TPayload;
}

export default Action;