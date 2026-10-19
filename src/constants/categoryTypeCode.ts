export const CategoryTypeCode = {
  TRANSFER: "TRANSFER",
} as const;

export type CategoryTypeCode =
  (typeof CategoryTypeCode)[keyof typeof CategoryTypeCode];
