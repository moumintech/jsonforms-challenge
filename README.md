

# JSONForms avec Ant Design 

Ce projet implémente un **formulaire dynamique en React** utilisant **JSONForms**, **Ant Design**, et **ProLayout**. Il permet de générer automatiquement des formulaires à partir de schémas JSON et affiche une catégorisation personnalisée via un **Drawer latéral**.

## Fonctionnalités

- Formulaires dynamiques avec JSONForms et JSON Schema
- Navigation avec un Drawer latéral au lieu d'onglets classiques
- Deux sets de formulaires distincts :
  - **Vos Informations Personnelles** (3 sous-catégories)
  - **Votre Parcours Professionnel** (2 sous-catégories)
- Custom Renderer pour JSONForms permettant d'afficher les formulaires selon la catégorie sélectionnée

- Icônes personnalisées pour les catégories dans le Drawer

---



---

## Problèmes Rencontrés et Solutions

### Problème : Compatibilité des dépendances avec React 19

Certaines dépendances, notamment `@jsonforms/react` et `@jsonforms/antd`, ne sont pas encore totalement compatibles avec React 19. Pour éviter les conflits, le projet utilise **React 18**.

**Solution :**

```sh
npm install react@18 react-dom@18
```

### Problème : Difficulté à trouver les renderers compatibles

Lors de l'intégration de JSONForms, certains renderers ne fonctionnaient pas correctement avec Ant Design.

**Solution :**

```sh
npm install @jsonforms/material-renderers
```

Cela a permis d'utiliser `materialRenderers` et `materialCells` en complément des renderers Ant Design.

---

## Sources et Documentation

- JSONForms : [https://jsonforms.io/](https://jsonforms.io/)
- Ant Design : [https://ant.design/](https://ant.design/)
- Ant Design ProLayout : [https://procomponents.ant.design/](https://procomponents.ant.design/)
- GitHub JSONForms : [https://github.com/eclipsesource/jsonforms](https://github.com/eclipsesource/jsonforms)
- TypeScript et React : [Documentation officielle de TypeScript](https://www.typescriptlang.org/docs/) et [React avec TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- Vidéos de formation React et TypeScript utilisées pour mieux comprendre l’implémentation

---

## Déploiement du projet

Le projet sera déployé sur **CodeSandbox**.

---


