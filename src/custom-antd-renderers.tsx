import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Input, DatePicker, Checkbox, Select } from "antd";
import { ControlProps } from "@jsonforms/core";

// --- Champs personnalisés pour JSONForms + Ant Design ---
// Je préfère séparer chaque champ dans un composant dédié pour plus de clarté.

const AntdTextField = ({ data, handleChange, path }: ControlProps) => (
  // Champ texte classique avec le composant Input d'Ant Design.
  // On initialise à "" si data est undefined ou null.
  <Input
    value={data || ""}
    onChange={(e) => handleChange(path, e.target.value)}
  />
);

const AntdDateField = ({ data, handleChange, path }: ControlProps) => (
  // Champ date basé sur DatePicker.
  // On renvoie la date formatée en "YYYY-MM-DD" pour rester cohérent avec JSONForms.
  <DatePicker
    value={data}
    onChange={(date) => handleChange(path, date?.format("YYYY-MM-DD"))}
  />
);

const AntdCheckbox = ({ data, handleChange, path }: ControlProps) => (
  // Checkbox simple, utile pour les champs booléens.
  // J'ai laissé "Cochez cette option" comme label, c'est un exemple minimaliste.
  <Checkbox
    checked={data}
    onChange={(e) => handleChange(path, e.target.checked)}
  >
    Cochez cette option
  </Checkbox>
);

const AntdSelect = ({ data, handleChange, path, schema }: ControlProps) => (
  // Select (liste déroulante) : on utilise la propriété "enum" de JSON Schema pour les options.
  // On mappe chaque élément de l'enum pour créer un <Select.Option>.
  <Select value={data} onChange={(value) => handleChange(path, value)}>
    {schema?.enum?.map((option: string) => (
      <Select.Option key={option} value={option}>
        {option}
      </Select.Option>
    ))}
  </Select>
);

// On enregistre nos renderers personnalisés pour JSONForms.
// Pour l'instant, on utilise un "tester" basique qui renvoie 1.
// Dans un projet plus avancé, on pourrait filtrer précisément chaque composant.
export const customRenderers = [
  { tester: () => 1, renderer: withJsonFormsControlProps(AntdTextField) },
  { tester: () => 1, renderer: withJsonFormsControlProps(AntdDateField) },
  { tester: () => 1, renderer: withJsonFormsControlProps(AntdCheckbox) },
  { tester: () => 1, renderer: withJsonFormsControlProps(AntdSelect) },
];
