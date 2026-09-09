# ERP Dynamic Invoice & Approval Workflow

This project is a sophisticated ERP-level invoice creation and approval workflow built as part of a Senior Frontend Engineer Assessment. It demonstrates enterprise-grade architecture, advanced React patterns, robust state management, and pixel-perfect UI implementation.

## 🚀 Features

### 1. Dynamic Wizard Workflow
- **Four-Step Process:** Basic Information → Invoice Items & Stock Management → Cost Center & Approval → Review & Issue.
- **Dynamic Rule Engine:** A JSON-configured rule engine (`wizardRules.json`) determines step visibility and field requirements based on invoice data. For instance, the "Cost Center & Approval" step is automatically skipped for "Cash" invoices or required only when the total exceeds 50,000 SAR.

### 2. Enterprise Data Entry & Validation
- **Complex Form State:** Seamlessly integrated `react-hook-form` and `zod` for declarative, strict, and performant validation.
- **Inventory & Stock Management:** Real-time calculation of row-level subtotals, discounts, and taxes. Built-in alerts warn users when requested quantities exceed available stock.
- **Auto-Save & Draft Handling:** Robust auto-save mechanism that persists data periodically. It gracefully handles 409 Conflicts in the event of concurrent draft edits.

### 3. Architecture & State Management
- **Zustand Store:** Centralized, decoupled state management (`useInvoiceStore`) to manage the invoice data and wizard navigation independently of the React component tree.
- **Role-Based Access Control (RBAC):** A custom `usePermissions` hook and `PermissionGuard` component to restrict UI actions (e.g., Sales vs. Manager vs. Admin roles).
- **Extensible API Client:** Configured with robust error handling and integrated with Next.js App Router API Routes to mock real-world network latency and status codes (409, 422, 500).

### 4. High-Fidelity UI/UX (Figma to Code)
- **Pixel-Perfect Implementation:** Exacting attention to the provided Figma designs, typography, colors, and layout structure (RTL optimized).
- **Micro-Interactions:** Smooth CSS transitions between wizard steps and carefully crafted empty states for better UX.
- **Shadcn UI & Tailwind CSS:** Built on top of Shadcn UI components, fully customized using Tailwind CSS to match the enterprise design language.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form, Zod
- **Testing:** Vitest, React Testing Library
- **Icons:** Lucide React

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend-erb-task
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Run Unit Tests:**
   ```bash
   pnpm vitest run
   ```

## 🏗 Architecture Decisions

- **Why Zustand?** For a multi-step wizard, Redux is often overkill, while React Context can lead to unnecessary re-renders. Zustand provides a minimal, scalable, and highly performant alternative.
- **Why a JSON Rule Engine?** Hardcoding business logic (like "if total > 50,000") in components makes the system brittle. A dynamic, config-driven rule engine ensures that business rules can be updated without refactoring the core UI components, fulfilling the true requirement of an "Enterprise ERP".
- **Why React Hook Form?** To handle the performance bottleneck of 100+ invoice items, uncontrolled form inputs are necessary. RHF provides excellent performance and integrates flawlessly with Zod for complex validation schemas.

## ✅ Assessment Requirements Fulfilled
- ✅ 4-Step Wizard Implementation
- ✅ Complex calculations and stock validation
- ✅ Dynamic rules (JSON Rule Engine)
- ✅ Auto-save with Conflict (409) handling
- ✅ RBAC (Role-Based Access Control)
- ✅ Unit Tests for core business logic
- ✅ High-quality, pixel-perfect UI (RTL)
