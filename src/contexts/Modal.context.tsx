"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { TModalContext } from "../../types";

const ModalContext = createContext<TModalContext>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        openModal: () => {
          setOpen(true);
        },
        closeModal: () => {
          setOpen(false);
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  }
  return context;
};

export default ModalContextProvider;
