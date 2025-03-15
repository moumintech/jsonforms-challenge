import React, { useState } from "react";
import { JsonFormsDispatch } from "@jsonforms/react";
import {
  rankWith,
  RendererProps,
  uiTypeIs,
  Category,
  Categorization,
} from "@jsonforms/core";
import { Drawer, List, Button, Layout, Typography, Divider } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ForkOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

// Mapping des labels aux icônes correspondantes
const iconMapping: Record<string, React.ReactElement> = {
  Identité: <UserOutlined />,
  Localisation: <EnvironmentOutlined />,
  "Centres d'intérêt": <HeartOutlined />,
  "Poste Actuel ou Recherché": <ForkOutlined />,
  Expertises: <BulbOutlined />,
};

const CategorizationRenderer: React.FC<RendererProps> = ({
  uischema,
  schema,
  path,
}) => {
  const categorization = uischema as Categorization;
  const [visible, setVisible] = useState(false);

  const hasCategories = categorization?.elements?.length > 0;
  const defaultCategory = hasCategories
    ? (categorization.elements[0] as Category)
    : null;
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    defaultCategory
  );

  const toggleDrawer = () => {
    setVisible((prev) => !prev);
  };

  if (!hasCategories) {
    return (
      <div style={{ padding: 20 }}>
        <p>Aucune catégorie disponible.</p>
      </div>
    );
  }

  // Styles pour le Drawer
  const drawerBodyStyle: React.CSSProperties = {
    backgroundColor: "#2F4466",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "20px",
  };

  // Style pour les éléments de la liste dans le Drawer
  const listItemStyle: React.CSSProperties = {
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
  };

  // Style pour le container du contenu principal (le "carré")
  const contentBoxStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  };

  return (
    <>
      {/* Insertion d'un style global pour gérer le hover */}
      <style>
        {`
          .drawer-list-item:hover {
            background-color: #f5a9b8 !important;
            color: black !important;
          }
        `}
      </style>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Drawer (slider bar) */}
        <Drawer
          title={null} // On supprime le titre par défaut pour customiser le contenu
          placement="left"
          closable={false} // Le bouton de fermeture est intégré dans le contenu
          onClose={toggleDrawer}
          open={visible}
          styles={{ body: drawerBodyStyle }} // Utilisation de styles.body au lieu de bodyStyle
        >
          <div style={{ width: "100%" }}>
            <List
              dataSource={categorization.elements as Category[]}
              renderItem={(category, index) => (
                <div key={category.label}>
                  {/* Insertion d'une ligne grise entre les deux groupes */}
                  {index === 1 && (
                    <Divider
                      style={{
                        backgroundColor: "grey",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <List.Item
                    style={listItemStyle}
                    className="drawer-list-item"
                    onClick={() => {
                      setSelectedCategory(category);
                      toggleDrawer();
                    }}
                  >
                    {/* Icône à gauche */}
                    <span style={{ marginRight: 8 }}>
                      {iconMapping[category.label]}
                    </span>
                    <span>{category.label}</span>
                  </List.Item>
                </div>
              )}
            />
            {/* Bouton de fermeture placé au centre dans le Drawer */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={toggleDrawer}
                style={{
                  backgroundColor: "#add8e6", // bleu très clair
                  borderColor: "#add8e6",
                  color: "black",
                }}
              >
                Fermer le menu
              </Button>
            </div>
          </div>
        </Drawer>

        {/* Contenu principal */}
        <Content style={{ padding: "20px" }}>
          {/* Bouton d'ouverture visible lorsque le Drawer est fermé */}
          {!visible && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Button
                type="primary"
                onClick={toggleDrawer}
                style={{
                  backgroundColor: "#add8e6",
                  borderColor: "#add8e6",
                  color: "black",
                }}
              >
                Ouvrir le menu
              </Button>
            </div>
          )}

          {selectedCategory && (
            <>
              <Title level={3} style={{ textAlign: "center" }}>
                {selectedCategory.label}
              </Title>
              <div style={contentBoxStyle}>
                {selectedCategory.elements.map((element, index) => (
                  <JsonFormsDispatch
                    key={index}
                    uischema={element}
                    schema={schema}
                    path={path}
                  />
                ))}
              </div>
            </>
          )}
        </Content>
      </Layout>
    </>
  );
};

export const categorizationTester = rankWith(2, uiTypeIs("Categorization"));

export default CategorizationRenderer;
