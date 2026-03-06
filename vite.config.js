import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Hospital-management-system/',
})
```

> ⚠️ The `base` must exactly match your GitHub repo name (case-sensitive)

---

**STEP 2 — Create the GitHub Actions workflow file**

Inside your project folder, create this folder path and file:
```
.github/workflows/deploy.yml
