export const uischema = {
  type: "Categorization",
  elements: [
    {
      type: "Category",
      label: "Identité",
      elements: [
        { type: "Control", scope: "#/properties/Nom" },
        { type: "Control", scope: "#/properties/Prénom" },
        { type: "Control", scope: "#/properties/Date de naissance" },
      ],
    },
    {
      type: "Category",
      label: "Localisation",
      elements: [
        { type: "Control", scope: "#/properties/address/properties/Rue" },
        { type: "Control", scope: "#/properties/address/properties/Ville" },
        {
          type: "Control",
          scope: "#/properties/address/properties/Code Postal",
        },
      ],
    },
  ],
};
