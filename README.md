# 🧠 Fetching Best Practice (Next.js + TanStack Query)

Latihan menerapkan **best practice dalam data fetching** menggunakan  
**Next.js App Router**, **TanStack Query (React Query v5)**, dan **Prisma ORM**.  
Project ini berfokus pada arsitektur clean, modular service pattern, serta integrasi antara frontend dan backend API route.

---

## 🚀 Tech Stack

| Library / Tool                                         | Kegunaan                                      |
| ------------------------------------------------------ | --------------------------------------------- |
| [Next.js 15](https://nextjs.org)                       | Framework React untuk SSR & API routes        |
| [React 19](https://react.dev)                          | Library UI modern                             |
| [TanStack Query v5](https://tanstack.com/query/latest) | Data fetching, caching, dan mutation handling |
| [Prisma ORM](https://www.prisma.io)                    | ORM untuk akses database                      |
| [Axios](https://axios-http.com)                        | HTTP client untuk REST API                    |
| [React Hook Form](https://react-hook-form.com)         | Form handler ringan & efisien                 |
| [Zod](https://zod.dev)                                 | Schema validation untuk form dan API          |
| [Tailwind CSS](https://tailwindcss.com)                | Styling utility-first                         |
| [Lucide React](https://lucide.dev)                     | Icon set modern untuk React                   |
| [Radix UI](https://www.radix-ui.com/)                  | Komponen UI dasar yang accessible             |

---

## 📁 Struktur Project

📦 fetching-best-practice
┣ 📂 app
┃ ┣ 📂 api → Route handler (GET, POST, PUT, DELETE)
┃ ┣ 📂 todos → Halaman CRUD todo
┃ ┗ 📄 layout.tsx
┣ 📂 components → Reusable UI components
┣ 📂 lib → axiosInstance, apiHandler, query-client
┣ 📂 services → Layer fetching (useGetTodo, useCreateTodo, useUpdateTodo, dll)
┣ 📂 types → Type definition (TodoResponse, BaseResponse)
┣ 📄 global.d.ts → Deklarasi module CSS
┣ 📄 globals.css → Style global Tailwind
┣ 📄 tsconfig.json
┣ 📄 package.json
┗ 📄 README.md

---

## ⚙️ Setup Project

### Clone Repository

1. git clone https://github.com/titon19/fetching-best-practice.git
2. cd fetching-best-practice
3. npm install

```

### Migration

1. DATABASE_URL="mysql://user:password@localhost:3306/todos"
2. npx prisma migrate dev
3. npm run dev
4. 👉 http://localhost:3000

```

🧩 Fitur

✅ Fetch data todo list
✅ Tambah todo baru
✅ Edit todo
✅ Hapus todo
✅ Validasi form dengan Zod
✅ Query cache invalidation dengan TanStack Query
✅ Clean architecture: Service Layer + API Handler

```

```
