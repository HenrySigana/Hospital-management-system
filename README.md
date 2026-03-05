# 🏥 MediCore — Hospital Management System

A full-featured mini hospital management system built with React + Vite.

## Modules

| Module | Description |
|--------|-------------|
| 📊 Dashboard | Live stats, ward occupancy, recent activity |
| 👤 Patients | Full patient records — admit, discharge, CRUD |
| 👨‍⚕️ Staff | Doctor & nurse management, shifts, duty status |
| 📅 Appointments | Schedule consultations, follow-ups, emergencies |
| 💳 Billing | Invoicing, payment tracking, PDF invoice print |
| 🧪 Lab Results | Order tests, flag results (Normal/High/Low/Critical) |
| 💊 Prescriptions | Multi-drug prescriptions with dosage & frequency |
| 📄 Discharge | Structured discharge summaries with PDF print |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy

### GitHub Pages
```bash
npm run build
# Then push the /dist folder to gh-pages branch
```

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
Drag and drop the `/dist` folder after running `npm run build`.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **No external UI libraries** — fully custom components
- **Print API** — for PDF invoices and discharge summaries

## Project Structure

```
medicore/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx       # React entry point
    └── App.jsx        # Full application
```

## License

MIT — free to use and modify for your clinic.
