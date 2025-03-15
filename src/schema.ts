export const formSets = {
  "Vos Informations Personnelles": {
    categories: {
      Identité: {
        schema: {
          type: "object",
          properties: {
            Nom: { type: "string" },
            Prénom: { type: "string" },
            "Date de naissance": { type: "string", format: "date" },
          },
        },
        uischema: {
          type: "VerticalLayout",
          elements: [
            { type: "Control", scope: "#/properties/Nom" },
            { type: "Control", scope: "#/properties/Prénom" },
            { type: "Control", scope: "#/properties/Date de naissance" },
          ],
        },
      },
      Localisation: {
        schema: {
          type: "object",
          properties: {
            address: {
              type: "object",
              properties: {
                Rue: { type: "string" },
                Ville: { type: "string" },
                "Code Postal": { type: "string" },
              },
            },
          },
        },
        uischema: {
          type: "VerticalLayout",
          elements: [
            { type: "Control", scope: "#/properties/address/properties/Rue" },
            { type: "Control", scope: "#/properties/address/properties/Ville" },
            {
              type: "Control",
              scope: "#/properties/address/properties/Code Postal",
            },
          ],
        },
      },
      "Centres d'intérêt": {
        schema: {
          type: "object",
          properties: {
            Voyages: { type: "boolean" },
            Lecture: { type: "boolean" },
            Autres: { type: "boolean" },
          },
        },
        uischema: {
          type: "VerticalLayout",
          elements: [
            { type: "Control", scope: "#/properties/Voyages" },
            { type: "Control", scope: "#/properties/Lecture" },
            { type: "Control", scope: "#/properties/Autres" },
          ],
        },
      },
    },
  },
  "Votre Parcours Professionnel": {
    categories: {
      "Poste Actuel ou Recherché": {
        schema: {
          type: "object",
          properties: {
            "Intitulé du poste": { type: "string" },
            "Nom de l'entreprise": { type: "string" },
            "Années d'expérience": { type: "number" },
          },
        },
        uischema: {
          type: "VerticalLayout",
          elements: [
            { type: "Control", scope: "#/properties/Intitulé du poste" },
            { type: "Control", scope: "#/properties/Nom de l'entreprise" },
            { type: "Control", scope: "#/properties/Années d'expérience" },
          ],
        },
      },
      Expertises: {
        schema: {
          type: "object",
          properties: {
            compétences: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
        uischema: {
          type: "VerticalLayout",
          elements: [{ type: "Control", scope: "#/properties/compétences" }],
        },
      },
    },
  },
};
