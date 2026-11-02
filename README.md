# Together Coffee — Glasgow East End

> Coffee, culture & community in Glasgow's East End. Authentic Eritrean & Ethiopian flavours, specialty coffee & buna ceremony.

**Address:** 7 Cumbernauld Road, Glasgow G31 2SW, United Kingdom  
**Phone:** +44 7778 324873  
**WhatsApp:** [Order & Enquiries](https://wa.me/447778324873)  
**Email:** togethercoffee2025@outlook.com  
**Instagram:** [@togethercoffee2025](https://www.instagram.com/togethercoffee2025)

---

## Tech Stack
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS with custom palette tokens (`espresso`, `roast`, `mocha`, `cream`, `amber-gold`, `saffron`, `terracotta`)
- **Animations:** Motion (Framer Motion v12)
- **Icons:** Lucide React
- **State:** React Context + `useReducer` with persistent `localStorage` cart
- **Deployment:** Zero-config Vercel SPA (`vercel.json`)

---

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## Deployment to Vercel

### Option 1: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Via GitHub & Vercel Dashboard
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Together Coffee website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/together-coffee.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will auto-detect Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site will be live immediately!
