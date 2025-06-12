export type TField = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  variant?: "standard" | "outlined" | "filled";
  type?: string;
};

export type TCvEditFields = {
  name: string;
  fields: TField[];
};
