<<<<<<< HEAD
(Ta version locale du README)
=======

# jsonforms-challenge

=======

# JSONForms avec Ant Design et ProLayout

Ce projet implémente un **formulaire dynamique en React** utilisant **JSONForms**, **Ant Design**, et **ProLayout**. Il permet de générer automatiquement des formulaires à partir de schémas JSON et affiche une catégorisation personnalisée via un **Drawer latéral**.

## Fonctionnalités

- Formulaires dynamiques avec JSONForms et JSON Schema
- Navigation avec un Drawer latéral au lieu d'onglets classiques
- Deux sets de formulaires distincts :
  - **Vos Informations Personnelles** (3 sous-catégories)
  - **Votre Parcours Professionnel** (2 sous-catégories)
- Custom Renderer pour JSONForms permettant d'afficher les formulaires selon la catégorie sélectionnée
- Données sauvegardées localement avec `localStorage` pour ne pas les perdre au rafraîchissement
- Icônes personnalisées pour les catégories dans le Drawer

---

## Dépendances Utilisées

Le projet utilise les bibliothèques suivantes :

```json
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@jsonforms/react": "^3.0.0",
  "@jsonforms/core": "^3.0.0",
  "@jsonforms/antd": "^3.0.0",
  "antd": "^5.0.0",
  "@ant-design/icons": "^5.0.0",
  "@ant-design/pro-layout": "^6.0.0",
  "@jsonforms/material-renderers": "^3.0.0"
}
```

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

Le projet sera déployé sur **CodeSandbox**. Une fois le déploiement terminé, le lien sera ajouté ici pour accéder à la démonstration en ligne.

---

> > > > > > > 3b65b9f (Initial commit du projet JSONForms)
