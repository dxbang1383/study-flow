# Context Dự án Quản lý Học tập (Study Management Web App)

Đây là tài liệu được thiết kế dành riêng cho các AI Agent (như GitHub Copilot, ChatGPT, v.v.) để nhanh chóng nắm bắt cấu trúc và công nghệ của dự án trước khi thực hiện các yêu cầu của người dùng.

## 1. Tổng quan Kiến trúc (Architecture)
Dự án được chia thành hai phần tách biệt:
- **Frontend**: Nằm trong thư mục `frontend/`. Là một ứng dụng Single Page Application (SPA).
- **Backend**: Nằm trong thư mục `backend/`. Là một RESTful API Server.

Hai phần này giao tiếp với nhau thông qua HTTP Requests (CORS đã được bật).

## 2. Công nghệ sử dụng (Tech Stack)

### Frontend
- **Framework**: React 18 với Vite.
- **Ngôn ngữ**: TypeScript (`.ts`, `.tsx`).
- **Styling**: Tailwind CSS (có hỗ trợ Dark Mode thông qua class `dark`).
- **State Management**: `zustand` (được dùng trong `store.ts` để lưu trữ Tasks, Timer state, Theme, v.v.).
- **Routing**: `react-router-dom` (các route chính: `/`, `/login`, `/register`, `/dashboard`, `/tasks`, `/timer`).
- **Icons**: `lucide-react`.
- **Drag and Drop**: `react-dnd` (dùng cho bảng Kanban).

### Backend
- **Framework**: FastAPI (Python).
- **Cơ sở dữ liệu**: SQLite (file `users.db`).
- **ORM**: SQLAlchemy.
- **Data Validation**: Pydantic.
- **Authentication**: JWT (JSON Web Tokens) với thuật toán mã hóa `bcrypt` (sử dụng thư viện `passlib`). *Lưu ý: `bcrypt` bị ghim ở version `3.2.2` để tương thích với `passlib`*.

## 3. Cấu trúc Thư mục Quan trọng

### Frontend (`frontend/src/app/`)
- `App.tsx`: Nơi định nghĩa Routing và bọc các Providers (Auth, Dnd). Route `/` trỏ đến `LandingPage`.
- `pages/`: Chứa các trang toàn màn hình không có sidebar (`LandingPage.tsx`, `Login.tsx`, `Register.tsx`).
- `components/`: Chứa giao diện chính sau khi đăng nhập.
  - `Sidebar.tsx`: Thanh điều hướng bên trái.
  - `TopNav.tsx`: Thanh trên cùng (chứa thanh tìm kiếm, toggle theme, thông báo, và User Profile).
  - `ProfileModal.tsx`: Popup sửa thông tin cá nhân.
  - `TaskManager.tsx`: Quản lý công việc dạng Kanban.
  - `Timer.tsx`: Quản lý thời gian học/chơi (Pomodoro style).
- `context/AuthContext.tsx`: Quản lý token đăng nhập và thông tin `user` hiện tại. Lưu `token` vào `localStorage`.
- `components/store.ts`: Zustand store quản lý dữ liệu local (Tasks, Subjects, Streak).

### Backend (`backend/app/`)
- `main.py`: Chứa các API endpoints (`/register`, `/login`, `/me`, `/users/me`).
- `models.py`: Định nghĩa các bảng Database bằng SQLAlchemy.
  - **Bảng `User`**: `id`, `username`, `hashed_password`, `email`, `nickname`, `role`, `avatar`.
- `schemas.py`: Định nghĩa Pydantic models cho Data validation (Input/Output).
- `auth.py`: Logic mã hóa mật khẩu và tạo JWT Token.
- `database.py`: Kết nối SQLite.

## 4. Quy trình Xác thực (Authentication Flow)
1. User điền form tại `/register` -> Gọi `POST /register`.
2. User điền form tại `/login` -> Gọi `POST /login` với form-data (username, password). Backend trả về `access_token`.
3. Frontend lưu `access_token` vào `localStorage` và gọi `GET /me` để lấy thông tin chi tiết của user (bao gồm `avatar`, `nickname`, `role`).
4. Bất cứ khi nào cập nhật thông tin (`PUT /users/me`), Frontend sẽ gọi hàm `updateUser` trong `AuthContext` để cập nhật UI ngay lập tức mà không cần reload.

## 5. Lưu ý cho AI Agent
- Khi thêm UI mới, **luôn dùng Tailwind CSS** và đảm bảo hỗ trợ cả Light/Dark mode (sử dụng prefix `dark:`).
- Khi sửa đổi cơ sở dữ liệu (`models.py`), hãy nhắc người dùng xóa file `backend/users.db` và khởi động lại server nếu dự án đang trong giai đoạn phát triển (chưa cấu hình Alembic migration).
- Khi thay thế hoặc thêm file, luôn kiểm tra xem các imports đã chính xác chưa.
