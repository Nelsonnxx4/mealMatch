import React from "react";

export interface Country {
  code: string;
  name: string;
  flag: React.ReactNode;
  currency: string;
  currencySymbol: string;
}
