"use client";

import { useContext } from "react";

import { StoreContext } from "./StoreProvider";

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}

