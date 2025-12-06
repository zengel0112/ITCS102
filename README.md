# ITCS102 - Kara the Ladybug Project

React + TypeScript + Tailwind CSS проект

## Суулгалт

1. Dependencies суулгах:
```bash
npm install
```

2. Development server ажиллуулах:
```bash
npm run dev
```

3. Production build хийх:
```bash
npm run build
```

4. Build preview харах:
```bash
npm run preview
```

## Төслийн бүтэц

```
├── src/
│   ├── components/       # React компонентүүд
│   │   ├── Header.tsx
│   │   ├── TaskSection.tsx
│   │   ├── DesktopPet.tsx
│   │   └── Pagination.tsx
│   ├── data/            # Өгөгдөл
│   │   └── tasks.ts
│   ├── types/           # TypeScript төрлүүд
│   │   └── task.ts
│   ├── utils/           # Хэрэглэгдэх функцүүд
│   │   └── protect.ts
│   ├── App.tsx          # Үндсэн App компонент
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS
├── public/              # Static assets (хэрэв байгаа бол)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Анхааруулга

Assets (avatar/, background/, gifs/, desktop_pet/) нь `public/` folder руу шилжүүлэх шаардлагатай байж магадгүй. Vite нь `public/` folder-ийн агуулгыг root-оос serve хийдэг.

Хэрэв assets нь root дээр байвал, тэдгээрийг `public/` folder руу шилжүүлнэ үү:

```bash
mkdir -p public
mv avatar background gifs desktop_pet public/
```

Эсвэл `vite.config.ts` дээр `publicDir` тохиргоог өөрчлөнө.

## Технологиуд

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool


