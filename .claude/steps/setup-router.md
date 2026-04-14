# Setup Expo Router — Étape 2

**Sprint :** 1 (Fondations)  
**Date :** 14 avril 2026  
**Durée estimée :** 4-5h  
**Durée réelle :** ~3h  
**Status :** ✅ Complété

---

## 📌 Objectif

Mettre en place **Expo Router v3** avec une structure claire, scalable et adaptée à une app complexe (multi-feature).

**Résultat attendu :** Navigation fonctionnelle entre 4 screens principaux, structure prête pour la croissance.

---

## ⚙️ Implémentation

### 1. Installation des dépendances

```bash
npm install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

**Dépendances installées :**
- ✅ `expo-router` — Navigation file-based routing
- ✅ `react-native-safe-area-context` — Gestion des zones sûres
- ✅ `react-native-screens` — Performance optimisée
- ✅ `expo-linking` — Deep linking support
- ✅ `expo-constants` — Configuration app
- ✅ `expo-status-bar` — Barre de statut

### 2. Configuration app.json

**Créé :** `app.json`

```json
{
  "expo": {
    "name": "TCHEKSPLAY",
    "slug": "tcheksplay",
    "version": "1.0.0",
    "plugins": [
      "expo-router"
    ]
  }
}
```

**Points clés :**
- ✅ Plugin `expo-router` configuré
- ✅ Safe area provider intégré
- ✅ StatusBar setup

### 3. Structure `/app` créée

```
app/
├── _layout.tsx              # Root layout (Stack Navigator)
├── index.tsx                # Home screen de base
└── (tabs)/
    ├── _layout.tsx          # Tabs layout (4 tabs)
    ├── home.tsx             # Tab 1 — Accueil
    ├── live.tsx             # Tab 2 — Live Matches
    ├── profile.tsx          # Tab 3 — Profil
    └── rankings.tsx         # Tab 4 — Rankings
```

**Architecture file-based :**
- Root layout (`_layout.tsx`) centralise la configuration globale
- Groupes de routes avec parenthèses : `(tabs)` pour organiser par feature
- Chaque screen est son propre fichier `.tsx`

### 4. Root Layout (`app/_layout.tsx`)

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
```

**Points clés :**
- ✅ `SafeAreaProvider` — Gère les encoches et zones sûres
- ✅ `Stack` Navigator — Navigation par écrans
- ✅ `headerShown: false` — Pas d'en-têtes natifs (custom design plus tard)
- ✅ `StatusBar` — Barre de statut visible

### 5. Tabs Layout (`app/(tabs)/_layout.tsx`)

```tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="live" options={{ title: 'Live' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
      <Tabs.Screen name="rankings" options={{ title: 'Rankings' }} />
    </Tabs>
  );
}
```

**Points clés :**
- ✅ 4 tabs définies
- ✅ Titres en français
- ✅ Structure prête pour icônes et designs custom

### 6. Screens simples

Chaque screen (`home.tsx`, `live.tsx`, `profile.tsx`, `rankings.tsx`) contient :

```tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Accueil</Text>
    </View>
  );
}
```

**Points clés :**
- ✅ Componentes simples, sans styling avancé (NativeWind ajouté plus tard)
- ✅ Structure claire : View → Text
- ✅ Prêt pour ajouter du contenu

### 7. Home Screen principal (`app/index.tsx`)

```tsx
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>TCHEKSPLAY</Text>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>Navigation Expo Router - Étape 2 ✅</Text>
      <Link href="/" asChild>
        <Text style={{ fontSize: 14, color: '#0066cc' }}>Navigation fonctionnelle</Text>
      </Link>
    </View>
  );
}
```

**Points clés :**
- ✅ Point d'entrée unique
- ✅ Test de navigation basique
- ✅ Message de confirmation que tout marche

---

## 🎯 Choix Techniques

### 1. Expo Router vs React Navigation

**Choix :** Expo Router (file-based routing)

**Raison :**
- ✅ Routing basé sur la structure de fichiers (comme Next.js)
- ✅ Linked via dossiers → plus facile à scalabiliser
- ✅ Intégration native avec Expo SDK
- ✅ Deep linking intégré
- ✅ Meilleure performance que React Navigation

**Alternative rejetée :**
- ❌ React Navigation — Plus complexe, moins d'abstraction

### 2. Groupage de routes avec parenthèses `(tabs)`

**Choix :** Utiliser `(tabs)` group pour organiser les routes par feature

**Raison :**
- ✅ Permet de grouper logiquement les routes
- ✅ N'affecte pas le routing URL
- ✅ Prépare pour d'autres groupes : `(auth)`, `(feed)`, etc.
- ✅ Scalabilité future

**Alternatively:**

```
app/
├── index.tsx
├── tabs/                    # ❌ Cette approche crée /tabs/:screen URLs
│   ├── home.tsx
```

### 3. SafeAreaProvider au Root

**Choix :** Envelopper l'app entière dans `SafeAreaProvider`

**Raison :**
- ✅ Gère automatiquement les encoches (notch, Dynamic Island)
- ✅ Fonctionne sur tous les devices
- ✅ Évite code manual pour chaque screen
- ✅ Standard Expo best practice

### 4. Stack Navigator au Root

**Choix :** Utiliser `Stack` au root pour centraliser la config

**Raison :**
- ✅ Point d'entrée unique
- ✅ Permet d'ajouter des overlays globaux plus tard (modals, etc.)
- ✅ Facile d'ajouter l'auth flow (passer à `(auth)` vs `(tabs)`)

---

## ⚠️ Pièges à Éviter

### ❌ Mauvaise organisation des routes
**Piège :** Créer des dossiers sans parenthèses engendre des URL manquées
```
app/
├── tabs/              # ❌ FAUX — URLs deviennent /tabs/home
│   ├── home.tsx
```

**Solution :** Utiliser `(tabs)` pour grouper sans impacter les URLs
```
app/
├── (tabs)/            # ✅ CORRECT — URLs restent /home
│   ├── home.tsx
```

### ❌ Importer du code inutile
**Piège :** Mettre beaucoup de logique dans `_layout.tsx`
```tsx
// ❌ FAUX
export default function RootLayout() {
  // 500 lignes de logique ici
}
```

**Solution :** Garder `_layout.tsx` simple, extraire la logique dans des hooks/utils
```tsx
// ✅ CORRECT
export default function RootLayout() {
  // Juste la structure de navigation
}
```

### ❌ HeaderShown = true par défaut
**Piège :** Oublier que `headerShown` est `true` par défaut, créant des en-têtes non-désirés
```tsx
// ❌ FAUX
<Stack>  {/* Headers apparaissent partout */}
```

**Solution :** Explicitement `headerShown: false` au root
```tsx
// ✅ CORRECT
<Stack screenOptions={{ headerShown: false }}>
```

### ❌ Oublier SafeAreaProvider
**Piège :** App qui ne respecte pas les zones sûres sur iPhone/Android
```tsx
// ❌ FAUX
export default function App() {
  return <Stack />; {/* Contenu peut être caché derrière la notch */}
}
```

**Solution :** Toujours envelopper dans `SafeAreaProvider`
```tsx
// ✅ CORRECT
<SafeAreaProvider>
  <Stack />
</SafeAreaProvider>
```

---

## 💡 À Retenir pour la Suite

### Conventions de Schéma de Dossiers

À partir de maintenant :
1. **Groupes de routes** — Utiliser `(feature)` pour organiser
2. **Screens** — Créer dans le groupe correspondant
3. **Layouts** — Un `_layout.tsx` par niveau hiérarchique

### Futur : Auth Flow

Quand l'authentification sera ajoutée (Sprint 3+), structure prévue :

```
app/
├── _layout.tsx                # Root avec Switch basé sur auth
├── (auth)/
│   ├── _layout.tsx            # Auth navigator
│   ├── login.tsx
│   ├── signup.tsx
│   └── reset-password.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── home.tsx
    ├── live.tsx
    ├── profile.tsx
    └── rankings.tsx
```

Le Root layout basculera entre `(auth)` et `(tabs)` selon l'état d'authentification.

### Dépendances pour NativeWind (Étape 3)

La structure actuelle (`(tabs)`) est prête pour :
- Ajout rapide de NativeWind
- Styling avec Tailwind classes
- Thème light/dark

Pas de refactoring nécessaire ! ✅

### Standards à Respecter

1. ✅ **Un fichier = un component** (sauf `_layout.tsx`, `_error.tsx`)
2. ✅ **Noms simples** (home.tsx, live.tsx, pas "HomeScreen.tsx")
3. ✅ **Pas de logique métier** dans les layouts
4. ✅ **Types explicites** pour tous les props

---

## ✅ Checklist de Validation

- [x] Expo Router installé
- [x] app.json créé
- [x] Root layout (`_layout.tsx`) setup
- [x] Tabs layout configuré
- [x] 4 screens créés (home, live, profile, rankings)
- [x] Home screen affiche message de test✅ 
- [x] Navigation fonctionne entre les 4 tabs
- [x] Zéro erreurs de compilation
- [x] Code linte correctement
- [x] SafeAreaProvider wrapper
- [x] Structure prête pour NativeWind

---

## 🔗 Dépendances

**Étapes précédentes requises :**
- ✅ Étape 1 — Setup Expo + TypeScript (supposé complété)

**Impact sur étapes suivantes :**
- Étape 3 (NativeWind) — Structure prête, pas de refactoring
- Étape 4 (Screens) — Peut ajouter du contenu directement
- Étape 5 (Structure) — Organisé, zéro changement nécessaire

---

**Créé :** 14 avril 2026  
**Modifié :** 14 avril 2026  
**Version :** 1.0.0

✅ **ÉTAPE 2 COMPLÉTÉE**
