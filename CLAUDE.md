# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Life Strategy AI** is a Next.js 14 web application that provides strategic decision intelligence for high-stakes life decisions (investments, career transitions, negotiations, timing). The product targets overseas middle-class users (35-55 years old) and positions itself as "Decision Intelligence" rather than fortune-telling.

**Core Value Proposition**: Transform temporal calculations (based on Chinese metaphysics) into actionable strategic recommendations using AI synthesis.

## Technology Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom dark mode theme
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm lint
```

### Important Notes
- **TypeScript errors are ignored during build** (`typescript.ignoreBuildErrors: true` in next.config.js)
- **ESLint errors are ignored during build** (`eslint.ignoreDuringBuilds: true` in next.config.js)
- This is intentional for rapid prototyping but should be addressed before production deployment

## Architecture

### Application Flow (4-Stage User Journey)

The app uses a step-based state machine in `src/app/page.tsx`:

1. **Stage 1: Identity Sync** (`IdentitySync.tsx`)
   - User inputs: birth date, birth time, timezone
   - Creates `UserProfile` object
   - Advances to Stage 2

2. **Stage 2: Scenario Selection** (`ScenarioSelection.tsx`)
   - User selects one of 4 scenarios: `investment`, `career`, `negotiation`, `timing`
   - Each scenario has distinct strategic context
   - Advances to Stage 3

3. **Stage 3: The Inquiry** (`TheInquiry.tsx`)
   - Simulates backend calculation process with animated progress
   - Shows 6 analysis steps with pseudo-code display
   - **Currently uses mock data** - production should call Java backend + Gemini API
   - Advances to Stage 4

4. **Stage 4: Strategy Dashboard** (`StrategyDashboard.tsx`)
   - Displays strategic analysis results:
     - Efficiency Score & Risk Index
     - Evolution Path (Initial → Middle → Final phases)
     - Executive Summary
     - Actionable Steps (4 specific recommendations)
   - User can reset to start new analysis

### Internationalization (i18n)

The app supports **English (default)** and **Chinese** via React Context:

- **Context**: `src/contexts/LanguageContext.tsx`
  - Contains all translations in nested object structure
  - Provides `useLanguage()` hook with `t()` function and `setLanguage()`

- **Language Switcher**: `src/components/LanguageSwitcher.tsx`
  - Fixed position in top-right corner
  - Glass-morphism design with gold highlight

- **Translation Keys**: Use dot notation (e.g., `identity.birthDate`, `dashboard.efficiency`)
  - Dynamic content uses template literals: `t(\`dashboard.subtitle.\${scenario}\`)`

**Adding New Translations**:
1. Edit `src/contexts/LanguageContext.tsx`
2. Add keys to both `en` and `zh` objects
3. Use `t('your.key')` in components

See `INTERNATIONALIZATION.md` for detailed i18n documentation.

### Styling System

**Dark Mode First Design**:
- Deep slate backgrounds (`#0f172a` family)
- Gold accent color (`#facc15`) for primary actions
- Glass-morphism cards (`.glass-card` utility class)
- Custom gradient text (`.gradient-text` utility class)

**CSS Variables** (defined in `src/app/globals.css`):
- `--background`, `--foreground`, `--primary`, `--secondary`, etc.
- Tailwind extended with custom color tokens

**Fonts**:
- Body: Inter (Google Fonts)
- Display: Space Grotesk (Google Fonts)

### Component Structure

All components are client-side (`'use client'`) and use:
- Framer Motion for animations
- `useLanguage()` hook for translations
- TypeScript for type safety

**Key Components**:
- `IdentitySync.tsx`: Form with date/time/timezone inputs
- `ScenarioSelection.tsx`: 4 scenario cards with hover effects
- `TheInquiry.tsx`: Animated loading/calculation simulation
- `StrategyDashboard.tsx`: Results display with metrics and timeline
- `LanguageSwitcher.tsx`: Language toggle button

### State Management

- **Global Language State**: React Context (`LanguageContext`)
- **Application Flow State**: Local state in `src/app/page.tsx`
  - `step`: Current stage (1-4)
  - `userProfile`: Birth data from Stage 1
  - `selectedScenario`: Chosen scenario from Stage 2

### Type Definitions

Core types defined in `src/app/page.tsx`:
```typescript
type UserProfile = {
  birthDate: string;
  birthTime: string;
  timezone: string;
};

type Scenario = 'investment' | 'career' | 'negotiation' | 'timing';
```

## Backend Integration (TODO)

**Current State**: All data is mocked in frontend components.

**Production Architecture**:
1. User submits profile + scenario
2. Next.js API route (`/api/analyze`) receives request
3. Call Java backend for temporal calculations (排盘)
4. Pass calculation results to Gemini API for natural language synthesis
5. Return strategic recommendations to frontend

**Recommended Approach**:
- Create `src/app/api/analyze/route.ts` for API endpoint
- Use environment variables for API keys (`GEMINI_API_KEY`, `JAVA_API_URL`)
- Modify `TheInquiry.tsx` to call `/api/analyze` instead of using mock data

## Path Aliases

TypeScript path alias configured in `tsconfig.json`:
- `@/*` maps to `./src/*`
- Example: `import { useLanguage } from '@/contexts/LanguageContext'`

## Design Principles

1. **Avoid "Fortune-Telling" Language**: Use professional terminology like "Decision Intelligence", "Strategic Variables", "Temporal Matrix"
2. **Transparency**: Show calculation process to reduce "black box" anxiety
3. **Actionable Output**: Every analysis includes 4 concrete action steps
4. **Minimal Design**: Dark mode, subtle animations, no clutter
5. **Bilingual Support**: All user-facing text must have EN/ZH translations

## Common Tasks

### Adding a New Scenario
1. Add scenario type to `Scenario` union in `src/app/page.tsx`
2. Add scenario card in `ScenarioSelection.tsx`
3. Add translations for scenario in `LanguageContext.tsx` (both EN/ZH)
4. Add mock strategy data in `StrategyDashboard.tsx`

### Modifying Styles
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Use existing utility classes (`.glass-card`, `.gradient-text`) for consistency

### Testing the Full Flow
1. Run `npm run dev`
2. Navigate through all 4 stages
3. Test both EN and ZH languages
4. Verify all 4 scenarios display correctly

## Known Issues

- TypeScript strict mode is enabled but build errors are suppressed
- No backend integration yet (all data is mocked)
- No user authentication or data persistence
- No payment system integration
- No SEO optimization or metadata per page

## Future Enhancements (from README.md)

1. Backend integration (Java + Gemini API)
2. Payment system (Stripe subscription)
3. User authentication (NextAuth.js)
4. Data persistence (Supabase/Firebase)
5. SEO optimization
6. PWA support
7. Additional language support beyond EN/ZH
