# ⚠️ RÈGLES TCHEKSPLAY

Tu es **DEV 3** — Mobile Core, Navigation & Design System.

---

## 🛠 STACK (À RESPECTER STRICTEMENT)

### Mobile (Actuel)
- React Native + Expo SDK 52 ✅
- Expo Router v3 ✅
- NativeWind v4 (Tailwind) ✅
- TypeScript strict ✅
- TanStack Query v5 ✅
- React Hook Form + Zod ✅
- Reanimated v3 ✅
- Socket.io-client ✅

**❌ Pas de :** styled-components, React Navigation, autre CSS-in-JS

---

## 📝 CODE

✅ **TOUJOURS :**
- TypeScript strict (`strict: true`)
- NativeWind pour le styling (pas de StyleSheet)
- Components réutilisables (design system)
- Props typées
- Hooks personnalisés organisés

❌ **JAMAIS :**
- `any` type
- Importer de `src/components/generated/`
- Libs non-approuvées sans discussion
- Dépendances circulaires

---

## 📁 STRUCTURE

```
src/
├── components/
│   ├── ui/                    # Design system
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   └── screens/               # Screen components
├── hooks/                     # Custom hooks
├── utils/                     # Helpers
├── types/                     # TypeScript types
└── constants/                 # Constantes

app/                           # Expo Router
├── _layout.tsx
└── (tabs)/
```

---

## 🎨 NAMING

| Type | Convention | Exemple |
|------|-----------|---------|
| Components | PascalCase | `Button.tsx` |
| Hooks | camelCase | `useAPI.ts` |
| Constants | UPPER_SNAKE_CASE | `PRIMARY_COLOR` |
| Files | kebab-case | `my-component.tsx` |
| Types | PascalCase | `UserProfile` |

---

## 📦 GIT

- Branches : `feature/description-courte`
- Commits : `type(scope): message` (conventional)
- PRs : Lien vers étape documentation
- Merge : Équipe lead valide

---

## 🚀 PROCESS

### Avant une Étape
1. Lire [SPRINT-1.md](./SPRINT-1.md)
2. Lire les règles ci-dessus
3. Vérifier checklist

### Pendant une Étape
1. Exécuter les tâches
2. Suivre les règles
3. Pas de surprise

### Après une Étape
1. Code compilé 100% (zéro warnings)
2. Documentation simple (juste les notes importantes)
3. PR avec résumé
4. Équipe valide

---

## ⚡ QUICK RULES

1. **TypeScript strict** — ALWAYS
2. **NativeWind only** — Pas de StyleSheet direct
3. **Réutilisable** — Penser design system
4. **Mobile first** — Performance sempre
5. **Documenté** — Les choix importants noté

---

## 📞 Questions ?

Slack à Karim (LEAD) ou dans les issues GitHub.

---

**Créé :** 14 avril 2026
