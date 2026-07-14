# 🎨 commerce-clean-architecture-react

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

Implementación del frontend en **React + TypeScript** siguiendo **Clean Architecture** adaptada. Diseñada para que desarrolladores con experiencia en Clean Architecture del backend tengan una **curva de aprendizaje corta**.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Testing](#-testing)
- [Páginas y Rutas](#-páginas-y-rutas)
- [Principios Aplicados](#-principios-aplicados)
- [Patrones de Diseño](#-patrones-de-diseño)
- [Internacionalización](#-internacionalización)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

- ✅ **Clean Architecture** adaptada para React
- ✅ **TypeScript** estricto en toda la aplicación
- ✅ **Tailwind CSS v4** con plugin nativo de Vite
- ✅ **Zustand** para manejo de estado global
- ✅ **React Router v7** con rutas protegidas
- ✅ **JWT Authentication** con persistencia en localStorage
- ✅ **React Hook Form + Zod** para validación de formularios
- ✅ **Internacionalización** (Español e Inglés)
- ✅ **Notificaciones Toast** con react-hot-toast
- ✅ **Specification Pattern** en filtros de búsqueda
- ✅ **Unit Testing** con Vitest + React Testing Library
- ✅ **E2E Testing** con Playwright
- ✅ **Responsive Design** (Mobile First)

## 🏛️ Arquitectura

El proyecto sigue Clean Architecture adaptada para React. Los desarrolladores con experiencia en el backend encontrarán los mismos conceptos y patrones.

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (React)          │
│     Components, Pages, Hooks, Store         │
├─────────────────────────────────────────────┤
│          Application Layer                  │
│    Use Cases (I+Impl), DTOs, Mappers        │
├─────────────────────────────────────────────┤
│             Domain Layer                    │
│   Entities, Value Objects, Repositories     │
└─────────────────────────────────────────────┘
            Infrastructure Layer
     HTTP Client, Repositories, Storage
```

### Flujo de Datos

```
User Action (UI)
    ↓
Custom Hook (useProducts)
    ↓
Use Case (GetAllProductsUseCase)
    ↓
Repository Interface (IProductRepository)
    ↓
Repository Implementation (ProductRepository)
    ↓
HTTP Client (Fetch API)
    ↓
Backend (API)
```

### Mapeo Backend → Frontend

| Backend (API) | Frontend (React) | Propósito |
|----------------|-----------------|-----------|
| `Entities` | `domain/entities/` | Objetos de negocio con validaciones |
| `Value Objects` | `domain/valueObjects/` | Objetos inmutables (Money) |
| `IProductRepository` | `domain/repositories/` | Contratos de acceso a datos |
| `ICreateProductUseCase` | `application/useCases/` | Contratos de casos de uso |
| `CreateProductUseCase` | `application/useCases/` | Implementaciones de casos de uso |
| `DTOs` | `application/dto/` | Objetos de transferencia de datos |
| `ProductRepository` | `infrastructure/repositories/` | Implementación HTTP |
| `Controllers` | `presentation/pages/` | Orquestación de UI |

## 🛠️ Tecnologías

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | React | 19+ |
| **Lenguaje** | TypeScript | 5.x |
| **Build Tool** | Vite | 5.x |
| **Routing** | React Router | v7 |
| **Estado Global** | Zustand | 4.x |
| **Estilos** | Tailwind CSS | 4.3 |
| **Formularios** | React Hook Form | 7.x |
| **Validación** | Zod | 3.x |
| **HTTP** | Fetch API | Nativo |
| **i18n** | react-i18next | 14.x |
| **Notificaciones** | react-hot-toast | 2.x |
| **Testing Unit** | Vitest + RTL | 1.x |
| **Testing E2E** | Playwright | 1.x |

## 📁 Estructura del Proyecto

```
commerce-clean-architecture-frontend/
├── src/
│   ├── domain/                          # Capa de Dominio
│   │   ├── entities/
│   │   │   ├── Product.ts              # Entidad con validaciones
│   │   │   └── User.ts                 # Entidad de usuario
│   │   ├── valueObjects/
│   │   │   ├── Money.ts                # Value Object inmutable
│   │   │   └── ProductSearchCriteria.ts # Value Object para filtros
│   │   ├── repositories/
│   │   │   ├── IProductRepository.ts   # Contrato del repositorio
│   │   │   └── IAuthRepository.ts      # Contrato de autenticación
│   │   └── exceptions/
│   │       └── DomainException.ts      # Excepciones de dominio
│   │
│   ├── application/                     # Capa de Aplicación
│   │   ├── useCases/
│   │   │   ├── products/
│   │   │   │   ├── IGetAllProductsUseCase.ts
│   │   │   │   ├── GetAllProductsUseCase.ts
│   │   │   │   ├── IGetProductByIdUseCase.ts
│   │   │   │   ├── GetProductByIdUseCase.ts
│   │   │   │   ├── ICreateProductUseCase.ts
│   │   │   │   ├── CreateProductUseCase.ts
│   │   │   │   ├── IUpdateProductUseCase.ts
│   │   │   │   ├── UpdateProductUseCase.ts
│   │   │   │   ├── IDeleteProductUseCase.ts
│   │   │   │   ├── DeleteProductUseCase.ts
│   │   │   │   ├── ISearchProductsUseCase.ts
│   │   │   │   └── SearchProductsUseCase.ts
│   │   │   └── auth/
│   │   │       ├── ILoginUseCase.ts
│   │   │       ├── LoginUseCase.ts
│   │   │       ├── ILogoutUseCase.ts
│   │   │       └── LogoutUseCase.ts
│   │   ├── dto/
│   │   │   ├── ProductDto.ts
│   │   │   ├── CreateProductDto.ts
│   │   │   ├── UpdateProductDto.ts
│   │   │   ├── ProductSearchDto.ts
│   │   │   ├── LoginDto.ts
│   │   │   ├── LoginResponseDto.ts
│   │   │   └── PaginatedResponseDto.ts
│   │   └── mappers/
│   │       ├── ProductMapper.ts
│   │       └── UserMapper.ts
│   │
│   ├── infrastructure/                  # Capa de Infraestructura
│   │   ├── api/
│   │   │   ├── client/
│   │   │   │   └── httpClient.ts       # Fetch API configurado
│   │   │   └── endpoints.ts            # URLs centralizadas
│   │   ├── repositories/
│   │   │   ├── ProductRepository.ts    # Implementación HTTP
│   │   │   └── AuthRepository.ts       # Implementación HTTP auth
│   │   ├── storage/
│   │   │   ├── TokenStorage.ts         # Gestión de JWT
│   │   │   └── LocalStorageService.ts  # Wrapper genérico
│   │   └── config/
│   │       └── apiConfig.ts            # Configuración de API
│   │
│   ├── presentation/                    # Capa de Presentación
│   │   ├── components/
│   │   │   ├── common/                 # Reutilizables
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Card/
│   │   │   │   ├── Loading/
│   │   │   │   ├── ErrorMessage/
│   │   │   │   ├── Modal/
│   │   │   │   └── Pagination/
│   │   │   └── products/               # Específicos de productos
│   │   │       ├── ProductCard/
│   │   │       ├── ProductForm/
│   │   │       └── ProductFilters/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductListPage.tsx
│   │   │   │   ├── ProductDetailPage.tsx
│   │   │   │   ├── ProductCreatePage.tsx
│   │   │   │   └── ProductEditPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── products/
│   │   │       ├── useProducts.ts
│   │   │       ├── useProduct.ts
│   │   │       ├── useCreateProduct.ts
│   │   │       ├── useUpdateProduct.ts
│   │   │       ├── useDeleteProduct.ts
│   │   │       └── useSearchProducts.ts
│   │   ├── store/
│   │   │   ├── authStore.ts            # Estado de autenticación
│   │   │   └── productStore.ts         # Estado de productos
│   │   ├── context/
│   │   │   └── AuthInitializer.tsx     # Inicializa sesión al cargar
│   │   ├── routes/
│   │   │   ├── AppRoutes.tsx           # Definición de rutas
│   │   │   └── PrivateRoute.tsx        # Rutas protegidas
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx          # Layout con navbar
│   │   │   └── AuthLayout.tsx          # Layout para auth
│   │   └── i18n/
│   │       ├── i18n.ts                 # Configuración i18next
│   │       └── locales/
│   │           ├── en.json             # Traducciones inglés
│   │           └── es.json             # Traducciones español
│   │
│   ├── shared/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types/
│   │
│   ├── di/
│   │   └── container.ts                # Contenedor de dependencias
│   │
│   ├── App.tsx                         # Componente raíz
│   ├── main.tsx                        # Punto de entrada
│   └── index.css                       # Estilos globales + Tailwind v4
│
├── tests/
│   ├── unit/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── Product.test.ts
│   │   │   └── valueObjects/
│   │   │       └── Money.test.ts
│   │   ├── application/
│   │   │   └── useCases/
│   │   │       └── CreateProductUseCase.test.ts
│   │   └── presentation/
│   │       └── components/
│   │           └── ProductCard.test.tsx
│   └── e2e/
│       ├── auth.spec.ts
│       └── products.spec.ts
│
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) 20.x o superior
- [npm](https://www.npmjs.com/) 10.x o superior
- Backend API corriendo en `https://localhost:5001`

Verifica las instalaciones:

```bash
node --version   # v20.x o superior
npm --version    # 10.x o superior
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ZielGit/commerce-clean-architecture-react.git
cd commerce-clean-architecture-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Compilar TypeScript y verificar

```bash
npm run build
```

## ⚙️ Configuración

### Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
# URL del backend
VITE_API_BASE_URL=https://localhost:5001

# Entorno
VITE_ENV=development
```

## ▶️ Ejecución

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Modo producción

```bash
npm run build
npm run preview
```

### Con Hot Reload

```bash
npm run dev
# La app se recarga automáticamente al guardar cambios
```

## 🧪 Testing

### Ejecutar todos los tests

```bash
npm run test
```

### Tests unitarios con UI

```bash
npm run test:ui
```

### Tests con cobertura

```bash
npm run test:coverage
```

### Tests E2E

```bash
# Asegúrate de tener la app corriendo
npm run dev

# En otra terminal
npm run test:e2e

# Con interfaz visual
npm run test:e2e:ui
```

### Ejecutar tests específicos

```bash
# Solo tests de dominio
npx vitest tests/unit/domain

# Solo tests de un componente
npx vitest tests/unit/presentation/components/ProductCard
```

## 📡 Páginas y Rutas

| Ruta | Página | Auth | Descripción |
|------|--------|------|-------------|
| `/login` | `LoginPage` | ❌ | Formulario de autenticación |
| `/products` | `ProductListPage` | ✅ | Lista con filtros y paginación |
| `/products/create` | `ProductCreatePage` | ✅ | Crear nuevo producto |
| `/products/:id` | `ProductDetailPage` | ✅ | Detalle del producto |
| `/products/:id/edit` | `ProductEditPage` | ✅ | Editar stock del producto |
| `*` | `NotFoundPage` | - | Página 404 |

### Flujo de Autenticación

```
Usuario visita /products
    ↓
PrivateRoute verifica JWT en localStorage
    ↓
Sin JWT → Redirect a /login
Con JWT → Verifica con backend
    ↓
Token válido → Muestra la página
Token inválido → Limpia storage → Redirect a /login
```

## 🎯 Principios Aplicados

### SOLID

#### **S**ingle Responsibility Principle
- `ProductCard` solo renderiza un producto
- `useCreateProduct` solo maneja creación
- `ProductRepository` solo gestiona peticiones HTTP de productos

#### **O**pen/Closed Principle
- Nuevos Use Cases se agregan sin modificar los existentes
- Nuevos repositorios implementan interfaces sin cambiar la UI

#### **L**iskov Substitution Principle
- `ProductRepository` puede sustituirse por un mock en tests
- Cualquier implementación de `IProductRepository` funciona igual

#### **I**nterface Segregation Principle
- `IProductRepository` solo tiene operaciones de productos
- `IAuthRepository` solo tiene operaciones de autenticación

#### **D**ependency Inversion Principle
- Los Use Cases dependen de `IProductRepository`, no de `ProductRepository`
- Los Hooks dependen de Use Cases, no de repositorios directamente

### Clean Code

- ✅ Nombres descriptivos en inglés
- ✅ Funciones y componentes pequeños y enfocados
- ✅ Sin código duplicado (DRY)
- ✅ Comentarios solo cuando agregan valor
- ✅ TypeScript estricto (sin `any`)

### Domain-Driven Design

- ✅ **Entities** con validaciones (`Product`, `User`)
- ✅ **Value Objects** inmutables (`Money`, `ProductSearchCriteria`)
- ✅ **Repositories** como abstracción de persistencia
- ✅ **Use Cases** que representan acciones del negocio
- ✅ **Domain Exceptions** para errores de negocio

## 🎨 Patrones de Diseño

| Patrón | Ubicación | Propósito |
|--------|-----------|-----------|
| **Repository** | `infrastructure/repositories/` | Abstrae acceso a HTTP/API |
| **Dependency Injection** | `di/container.ts` | Inversión de control |
| **Factory Method** | `domain/entities/Product.ts` | Crea productos sin ID |
| **Specification** | `domain/valueObjects/ProductSearchCriteria.ts` | Encapsula criterios de búsqueda |
| **Mapper** | `application/mappers/` | Convierte DTO ↔ Entity |
| **Observer** | Zustand stores | Reactividad de estado global |

### Patrón Specification en Búsqueda

```typescript
// Crear criterios de búsqueda
const criteria = new ProductSearchCriteria(
  'laptop',          // name
  500,               // minPrice
  2000,              // maxPrice
  true,              // onlyInStock
  true               // onlyActive
);

// Usar en el Use Case
const products = await searchProductsUseCase.execute(criteria);
```

**Endpoint generado:**
```
GET /api/products/search?name=laptop&minPrice=500&maxPrice=2000&onlyInStock=true&onlyActive=true
```

### Dependency Injection Container

```typescript
// di/container.ts
const container = new DIContainer();

// En un Hook
const useCase = container.getCreateProductUseCase();
const product = await useCase.execute(data);
```

## 🌍 Internacionalización

### Idiomas soportados

| Idioma | Código | Archivo |
|--------|--------|---------|
| Inglés | `en` | `locales/en.json` |
| Español | `es` | `locales/es.json` |

### Cambiar idioma en la app

Mediante el botón en el navbar (`🇺🇸 EN` / `🇪🇸 ES`). El idioma se persiste en `localStorage`.

### Usar traducciones en componentes

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('products.title')}</h1>;
};
```

### Agregar un nuevo idioma

1. Crear `src/presentation/i18n/locales/fr.json`
2. Importarlo en `i18n.ts`
3. Agregarlo a los recursos de i18next

## 🎨 Estilos con Tailwind CSS v4

### Configuración

A diferencia de Tailwind v3, la versión 4 **no requiere** `tailwind.config.js` ni `postcss.config.js`. Todo se configura en `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary-600: #2563eb;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

### Plugin de Vite

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## 📚 Recursos Adicionales

### Libros Recomendados
- **Clean Architecture** - Robert C. Martin
- **Domain-Driven Design** - Eric Evans
- **Clean Code** - Robert C. Martin
- **Implementing Domain-Driven Design** - Vaughn Vernon

### Documentación Oficial
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [React Router v7](https://reactrouter.com)
- [Vitest Docs](https://vitest.dev)
- [Playwright Docs](https://playwright.dev)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE.md) para más detalles.

## 👤 Autor

**Frans J. Vilcahuamán Rojas**
- GitHub: [@ZielGit](https://github.com/ZielGit)
- LinkedIn: [in/frans-vilcahuaman](https://www.linkedin.com/in/frans-vilcahuaman/)
