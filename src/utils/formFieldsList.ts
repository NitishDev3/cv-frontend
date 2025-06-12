type TCvEditFields = {
  name: string;
  fields: {
    id: string;
    label: string;
    variant?: "standard" | "filled" | "outlined";
    required?: boolean;
    type?: string;
    inputProps?: object;
  }[];
};

export const CV_EDIT_FIELDS: TCvEditFields[] = [
  {
    name: "Basic Details",
    fields: [
      {
        id: "full-name",
        label: "Full Name",
        variant: "standard",
        required: true,
      },
      {
        id: "city",
        label: "City",
        variant: "standard",
        required: true,
      },
      {
        id: "email-id",
        label: "Email ID",
        variant: "standard",
        required: true,
      },
      {
        id: "mobile-no",
        label: "Mobile No.",
        variant: "standard",
        required: true,
        type: "number",
        inputProps: {
          inputMode: "numeric",
          pattern: "[0-9]*",
          sx: {
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            MozAppearance: "textfield",
          },
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn Link",
        variant: "standard",
        required: true,
      },
      {
        id: "github",
        label: "GitHub Link",
        variant: "standard",
        required: true,
      },
    ],
  },
];
