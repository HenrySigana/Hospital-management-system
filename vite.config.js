import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Hospital-management-system/',
})
```

5. Click **"Commit changes"** → **Commit directly to main**

---

That commit will automatically trigger your GitHub Action to rebuild and redeploy. Then:

1. Click the **Actions** tab in your repo
2. Watch the workflow run (takes ~2 min)
3. Once it shows ✅ green — visit:
```
https://henrysigana.github.io/Hospital-management-system/
