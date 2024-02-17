export type ZustandHookSelectors<StateType> = {
    [Key in keyof StateType as `use${Capitalize<string & Key>}`]: () => StateType[Key];
};
export interface ZustandGetterSelectors<StateType> {
    getters: {
        [key in keyof StateType]: () => StateType[key];
    };
}
export interface IAuth extends Record<string, any> {
    username: string;
    permissions: string[];
}
