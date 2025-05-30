import type {ReactNode} from "react";

export interface IProps {
    children: ReactNode;
}

export interface IState {
    hasError: boolean;
    error: Error | null;
}

export interface IErrorFallback {
    error: Error | null
}
