# NutriBreak Frontend

React + TypeScript single-page application integrating the NutriBreak Spring Boot API.

## Features
- Basic Auth login (encode user:pass) stored in localStorage (temporary approach)
- CRUD listings: meals, breaks; create operations
- Users page (admin only; fails silently if 403)
- Suggestion form hitting `/api/suggestions`
- i18n (en, pt) via react-i18next
- Environment config via `.env` (`VITE_API_BASE_URL`)

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Structure
```
frontend/
  src/
    pages/        # Route pages
    services/     # API client wrappers
    context/      # Auth context
    i18n/         # Translations
```

## Future Improvements
- Replace Basic Auth with token/JWT flow
- Add pagination controls in UI
- Add edit/delete for meals and breaks
- Role retrieval endpoint to conditionally render admin UI
- Central error boundary & toast notifications
- Move inline styles to CSS modules or Tailwind

## Security Note
Do not keep production credentials in localStorage for Basic Auth; migrate to token-based auth before production.
