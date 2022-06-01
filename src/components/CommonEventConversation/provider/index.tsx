import React, { useContext, ReactNode } from "react";
import {
  CreateEventProps,
  useCrateEventState,
  IFieldsError
} from "./useCreatEventState";

export type NavigationContextType = {
  readonly eventState: CreateEventProps;
  setEventState: (state: any) => void;
  readonly errorEventState: CreateEventProps;
  setErrorEventState: (state: any) => void;
  isSubmited: boolean;
  setSubmited: (state: boolean) => void;
  readonly errFieldsState: IFieldsError;
  setErrorFieldState: (state: any) => void;
};

type Props = {
  children: ReactNode;
};

const EventCreateContext = React.createContext<NavigationContextType | null>(
  null
);

const EventCreateProvider = ({ children }: Props) => {
  const {
    eventState,
    setEventState,
    errorEventState,
    setErrorEventState,
    isSubmited,
    setSubmited,
    errFieldsState,
    setErrorFieldState
  } = useCrateEventState();

  const providerValue = {
    eventState,
    setEventState,
    errorEventState,
    setErrorEventState,
    isSubmited,
    setSubmited,
    errFieldsState,
    setErrorFieldState
  };
  return (
    <EventCreateContext.Provider value={providerValue}>
      {children}
    </EventCreateContext.Provider>
  );
};

const useEventCreate = (): NavigationContextType => {
  const context = useContext(EventCreateContext);
  if (!context) {
    throw Error("Use useEventCreate in NavigationProvider");
  }
  return context;
};

export { EventCreateProvider, useEventCreate };
