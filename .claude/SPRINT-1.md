# 🚀 SPRINT 1 — CHECKLIST

**Durée :** 1 semaine  
**Objectif :** Créer foundations solides (Expo, Navigation, Design System, Screens)

---

## 1️⃣ SETUP EXPO & TYPESCRIPT (2-3h)

```bash
# Vérifier Node
node --version  # v18+

# Initialiser Expo
npx create-expo-app@latest tcheksplay
cd tcheksplay

# Dependencies core
npm install expo-router expo-linking expo-constants
npm install --save-dev typescript @types/react-native

# Design system
npm install nativewind tailwindcss
npm install --save-dev tailwindcss@3.3.0 postcss

# Linting
npm install --save-dev eslint prettier

# Première build
npm run start
```

**Checklist :**
- [ ] Expo app se lance
- [ ] TypeScript configuré (strict)
- [ ] ESLint + Prettier setup
- [ ] `.env.example` créé

---

## 2️⃣ EXPO ROUTER & NAVIGATION (4-5h)

**Créer structure :**
```
app/
├── _layout.tsx          # Root layout
├── index.tsx            # Redirect to (tabs)
└── (tabs)/
    ├── _layout.tsx      # Tab navigation
    ├── home.tsx         # Dashboard
    ├── live.tsx         # Live matches
    ├── profile.tsx      # User profile
    └── rankings.tsx     # Rankings
```

**Code dans `app/_layout.tsx` :**
```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

**Code dans `app/(tabs)/_layout.tsx` :**
```tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="live" options={{ title: 'Live' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="rankings" options={{ title: 'Rankings' }} />
    </Tabs>
  );
}
```

**Checklist :**
- [ ] Navigation entre screens fonctionne
- [ ] Tabs bottom affichés
- [ ] Routes correctes
- [ ] Zéro erreurs console

---

## 3️⃣ NATIVEWIND & DESIGN SYSTEM (5-6h)

**Setup Tailwind :**

1. Créer `tailwind.config.js` :
```js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",      // Brand color
        secondary: "#ec4899",
        neutral: {
          950: "#0f172a",
          900: "#111827",
          800: "#1f2937",
        },
      },
    },
  },
  plugins: [require("nativewind/plugin")],
}
```

2. Créer composants simples dans `src/components/ui/`:
   - `Button.tsx`
   - `Card.tsx`
   - `Text.tsx`

**Button.tsx exemple :**
```tsx
import { Pressable, Text } from 'react-native';
import { cn } from '@/utils';

export function Button({ label, onPress, variant = 'primary' }: any) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'px-4 py-2 rounded-lg',
        variant === 'primary' && 'bg-primary',
        variant === 'secondary' && 'bg-secondary'
      )}
    >
      <Text className="text-white font-bold">{label}</Text>
    </Pressable>
  );
}
```

**Checklist :**
- [ ] Tailwind fonctionne
- [ ] Composants créés (Button, Card, Text)
- [ ] Couleurs appliquées
- [ ] Zéro warnings de style

---

## 4️⃣ ÉCRANS MVP & LAYOUTS (6-7h)

Créer les 4 screens avec layouts basiques :

**home.tsx :**
```tsx
import { View, Text, FlatList } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold">Dashboard</Text>
      {/* Contenu futur */}
    </View>
  );
}
```

Faire pareil pour `live.tsx`, `profile.tsx`, `rankings.tsx`

**Checklist :**
- [ ] 4 screens créés
- [ ] Layout responsive
- [ ] Contenu placeholder
- [ ] Safe area respected

---

## 5️⃣ STRUCTURE FINALE & CONVENTIONS (2-3h)

**Créer :**
```
src/
├── components/ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── index.ts          # Barrel export
├── hooks/
│   └── index.ts
├── utils/
│   ├── cn.ts             # classnames helper
│   └── index.ts
├── types/
│   ├── global.d.ts
│   └── index.ts
└── constants/
    └── design.ts
```

**tsconfig.json (strict) :**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"]
    }
  }
}
```

**Checklist :**
- [ ] Structure de dossiers créée
- [ ] Barrel exports configurés
- [ ] TypeScript compilé 100%
- [ ] Zéro erreurs/warnings

---

## ✅ VALIDATION FINALE

À la fin du Sprint 1 :

- ✅ App se lance sans erreurs
- ✅ Navigation fonctionne entre 4 screens
- ✅ Design system utilisable
- ✅ TypeScript strict compilé
- ✅ Structure claire

**Si tout ✅ :** Prêt pour Sprint 2 (contenu métier)

---

## 📞 Besoin d'aide ?

- Design → NativeWind docs
- Navigation → Expo Router docs
- TypeScript → Consulter REGLES.md

---

**Dernière update :** 14 avril 2026
