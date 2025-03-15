import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Drawer, Grid, Typography, Divider } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  MenuOutlined,
  UserOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ForkOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { UISchemaElement } from "@jsonforms/core";
import { formSets } from "./schema";
import { customRenderers } from "./custom-antd-renderers";

const { Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export interface CategoryType {
  schema: object;
  uischema: UISchemaElement;
}

interface FormSet {
  categories: Record<string, CategoryType>;
}

// --- MAPPING DES ICONES POUR LES SOUS-CATEGORIES ---
// J'ai choisi quelques icônes standard pour illustrer chaque catégorie.
// C'est plus parlant pour l'utilisateur au premier coup d'œil.
const iconMapping: Record<string, React.ReactElement> = {
  "Informations de base": <UserOutlined />,
  Localisation: <EnvironmentOutlined />,
  "Centres d'intérêt": <HeartOutlined />,
  "Votre Parcours Professionnel": <ForkOutlined />,
  Expertises: <BulbOutlined />,
  // Ajoutez d'autres associations si nécessaire
};

const App: React.FC = () => {
  // J'utilise plusieurs états pour gérer les données du formulaire,
  // l'état d'ouverture/fermeture du menu (Drawer) et le Sider (Desktop).
  const [data, setData] = useState({});
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sélection par défaut : "Vos Informations Personnelles" + "Identité"
  // Cela permet d'avoir un formulaire affiché dès l'arrivée sur la page.
  const [selectedSet, setSelectedSet] = useState<keyof typeof formSets | null>(
    "Vos Informations Personnelles"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Identité"
  );

  // Détection du type d’écran (mobile ou desktop)
  // Très pratique pour conditionner l’affichage (Sider vs Drawer).
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Récupère l'ensemble de formulaires sélectionné (formSet)
  // et en extrait la catégorie choisie (category).
  const formSet: FormSet | null = selectedSet
    ? (formSets[selectedSet] as FormSet)
    : null;
  const category: CategoryType | null =
    formSet && selectedCategory ? formSet.categories[selectedCategory] : null;

  // Inverse l'état "collapsed" du Sider (desktop)
  // J'ai choisi de ne pas le gérer automatiquement pour donner plus de contrôle à l'utilisateur.
  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  // Ouvre/Ferme le Drawer (mobile)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Icône du bouton circulaire selon l'état du Sider
  // On met une flèche vers la droite quand le menu est fermé, et inversement.
  const arrowIcon = siderCollapsed ? <RightOutlined /> : <LeftOutlined />;

  /**
   * Construit la liste d'items du menu.
   * Pour chaque ensemble, on crée un sous-menu avec les catégories.
   * Un Divider est inséré avant le deuxième ensemble, si besoin.
   * J'aime bien cette approche "flatMap" qui concatène les menus et dividers.
   */
  const buildMenuItems = (): MenuProps["items"] => {
    const entries = Object.entries(formSets);
    return entries.flatMap(([setName, set], index) => {
      const menuChildren = Object.keys((set as FormSet).categories).map(
        (catName) => ({
          key: `${setName}-${catName}`,
          label: catName,
          icon: iconMapping[catName] ?? undefined,
          onClick: () => {
            setSelectedSet(setName as keyof typeof formSets);
            setSelectedCategory(catName);
            if (isMobile) {
              toggleDrawer();
            }
          },
        })
      );
      const submenu = {
        key: setName,
        label: setName,
        type: "submenu" as const,
        children: menuChildren,
      };

      // J'insère un Divider avant le deuxième set, juste pour aérer visuellement.
      if (index === 1) {
        return [
          {
            type: "divider" as const,
            key: `divider-${index}`,
          },
          submenu,
        ];
      }
      return [submenu];
    });
  };

  const menuItems = buildMenuItems();

  return (
    <>
      {/* Styles globaux pour le hover : fond rose clair et texte noir */}
      <style>
        {`
          .ant-menu-dark .ant-menu-item:hover,
          .ant-menu-dark .ant-menu-submenu-title:hover {
            background-color: #f5a9b8 !important;
            color: black !important;
          }
          .ant-menu-light .ant-menu-item:hover,
          .ant-menu-light .ant-menu-submenu-title:hover {
            background-color: #f5a9b8 !important;
            color: black !important;
          }
        `}
      </style>

      {/* Fond général gris pour toute la page */}
      <Layout style={{ minHeight: "100vh", backgroundColor: "#dcdcdc" }}>
        {/* Sider (Desktop) */}
        {!isMobile && (
          <Sider
            collapsible
            collapsed={siderCollapsed}
            collapsedWidth={80}
            width={250}
            style={{
              backgroundColor: "#2F4466",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
            trigger={null}
          >
            {/* Bouton circulaire centré pour ouvrir/fermer le menu */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Button
                shape="circle"
                icon={arrowIcon}
                onClick={toggleSider}
                style={{
                  backgroundColor: "#add8e6",
                  borderColor: "#add8e6",
                  color: "#2F4466",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedCategory || ""]}
              style={{
                backgroundColor: "#2F4466",
                color: "white",
                borderRight: "none",
              }}
              items={menuItems}
              theme="dark"
            />
          </Sider>
        )}

        {/* Mode mobile : bouton hamburger (en haut à gauche) et Drawer latéral */}
        {isMobile && (
          <>
            <Button
              shape="circle"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              style={{
                backgroundColor: "#add8e6",
                borderColor: "#add8e6",
                color: "#2F4466",
                margin: 8,
                position: "fixed",
                top: 16,
                left: 16,
                zIndex: 1000,
              }}
            />
            <Drawer
              placement="left"
              closable
              onClose={toggleDrawer}
              open={drawerOpen}
              styles={{ body: { padding: 0 } }}
              headerStyle={{ backgroundColor: "#2F4466", color: "white" }}
              bodyStyle={{ backgroundColor: "#2F4466" }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={[selectedCategory || ""]}
                items={menuItems}
                style={{ backgroundColor: "#2F4466", color: "white" }}
                theme="dark"
              />
            </Drawer>
          </>
        )}

        {/* Contenu principal */}
        <Layout>
          <Content style={{ margin: "16px", padding: "24px" }}>
            {/* Conteneur centré (le "carré") */}
            <div
              style={{
                maxWidth: "900px",
                width: "100%",
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "8px",
                margin: "30px auto 16px auto", // 30px en haut pour le placer légèrement plus haut
              }}
            >
              {category ? (
                <>
                  {/* Titre de la catégorie : par exemple "Identité" */}
                  <Title
                    level={3}
                    style={{ textAlign: "center", color: "#000" }}
                  >
                    {selectedCategory}
                  </Title>
                  <JsonForms
                    schema={category.schema}
                    uischema={category.uischema}
                    data={data}
                    onChange={({ data }) => setData(data)}
                    renderers={[...materialRenderers, ...customRenderers]}
                    cells={materialCells}
                  />
                </>
              ) : (
                // Message lorsque aucune catégorie n'est sélectionnée.
                <p style={{ textAlign: "center" }}>
                  Sélectionnez un formulaire dans le menu
                </p>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
