import CategorizationRenderer, {
  categorizationTester,
} from "./CategorizationRenderer";

export const customRenderers = [
  { tester: categorizationTester, renderer: CategorizationRenderer },
];
