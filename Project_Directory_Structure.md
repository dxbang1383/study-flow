# Cấu Trúc Thư Mục Dự Án Study Flow

Dự án Study Flow được chia thành hai phần chính: **Frontend** (giao diện người dùng) và **Backend** (máy chủ & cơ sở dữ liệu). Dưới đây là giải thích chi tiết chức năng của từng thư mục và tệp tin trong toàn bộ hệ thống.

---

## 📁 Thư mục gốc (`c:\Bang1383\study-flow`)
Thư mục gốc chứa các cài đặt cấu hình tổng quan và phân chia ứng dụng thành frontend/backend.

- 📄 **`.gitignore`**: Danh sách các file/folder bị bỏ qua khi đồng bộ với Git (không đưa lên GitHub).
- 📄 **`AI_CONTEXT.md`**: Tài liệu ngữ cảnh hệ thống, cung cấp thông tin về kiến trúc và các quy ước viết mã cho trợ lý AI.
- 📄 **`README.md`**: Tài liệu giới thiệu tổng quan về dự án, hướng dẫn cài đặt và chạy ứng dụng.
- 📄 **`Test_Cases_StudyFlow.xlsx`**: File Excel chứa danh sách các kịch bản kiểm thử (Test Cases) của hệ thống.
- 📄 **`scratch.py`**: File Python nháp dùng để chạy thử nghiệm các đoạn code nhỏ.

---

## 📁 Backend (`/backend`)
Được xây dựng bằng ngôn ngữ Python với framework **FastAPI** và cơ sở dữ liệu **SQLite**. Đảm nhận việc xử lý logic máy chủ, đăng nhập, và thao tác với Database.

- 📄 **`requirements.txt`**: Danh sách các thư viện Python cần cài đặt (FastAPI, SQLAlchemy, JWT, v.v.).
- 📄 **`users.db`**: File cơ sở dữ liệu SQLite chính của hệ thống, lưu trữ thông tin tài khoản người dùng một cách an toàn.
- 📁 **`venv/`**: Thư mục môi trường ảo (Virtual Environment) chứa các phiên bản cài đặt của thư viện Python, giúp tách biệt với hệ thống máy tính.
- 📁 **`storage/`**: Thư mục dùng để lưu trữ các file tải lên (ví dụ: ảnh avatar, tài liệu học tập).

### 📂 `backend/app/` (Chứa mã nguồn chính của Backend)
Đây là nơi chứa toàn bộ logic hoạt động của máy chủ.
- 📄 **`__init__.py`**: File rỗng, dùng để báo cho Python biết thư mục `app` là một module (gói code).
- 📄 **`main.py`**: Điểm khởi chạy của Backend (Entry point). Khai báo các đường dẫn API (routes), cấu hình CORS để cho phép Frontend gọi API, và khởi tạo kết nối Database.
- 📄 **`auth.py`**: Chứa toàn bộ logic xử lý bảo mật: mã hóa mật khẩu, tạo token (JWT) khi đăng nhập, và xác thực quyền truy cập.
- 📄 **`database.py`**: Thiết lập kết nối tới file cơ sở dữ liệu SQLite thông qua thư viện SQLAlchemy.
- 📄 **`models.py`**: Định nghĩa cấu trúc các bảng trong cơ sở dữ liệu (Database Schema). Ví dụ: Cấu trúc của bảng `User` có những cột nào.
- 📄 **`schemas.py`**: Định nghĩa các "khuôn mẫu" (Pydantic models) dùng để Validate (kiểm tra tính hợp lệ) dữ liệu đầu vào từ người dùng gửi lên hoặc dữ liệu đầu ra trả về.

---

## 📁 Frontend (`/frontend`)
Được xây dựng bằng **React**, **Vite**, **TypeScript** và **TailwindCSS**, quản lý toàn bộ giao diện tương tác với người dùng trên trình duyệt.

- 📄 **`package.json` & `package-lock.json`**: Chứa thông tin về dự án Node.js, danh sách các thư viện cài đặt (`npm install`) và các lệnh khởi chạy (`npm run dev`).
- 📄 **`vite.config.ts`**: File cấu hình cho Vite (Công cụ đóng gói và chạy server siêu tốc cho React).
- 📄 **`postcss.config.mjs` & `tailwind.css`**: Các file cấu hình cho TailwindCSS để biến đổi các utility classes thành CSS thực tế.
- 📄 **`index.html`**: Trang HTML gốc duy nhất của dự án (kiến trúc Single Page Application). React sẽ nhúng toàn bộ giao diện đồ sộ vào thẻ `<div id="root">` nằm trong file này.
- 📁 **`node_modules/`**: Thư mục chứa mã nguồn của hàng ngàn thư viện NPM đã tải về (tuyệt đối không chỉnh sửa file trong này).
- 📁 **`guidelines/`**: Chứa các file tài liệu hướng dẫn phát triển (như danh sách kịch bản test `.md`).

### 📂 `frontend/src/` (Mã nguồn chính của Giao diện)
- 📄 **`main.tsx`**: Điểm neo của React. Lấy component `App` cao nhất và gắn (render) nó vào giao diện HTML.

#### 📂 `frontend/src/styles/`
- Chứa các file CSS toàn cục (`globals.css`, `index.css`, `theme.css`, `fonts.css`). Dùng để thiết lập màu sắc chung, cấu hình chế độ Sáng/Tối (Dark/Light mode) và định nghĩa phông chữ.

#### 📂 `frontend/src/app/`
Nơi chứa toàn bộ cấu trúc kiến trúc của ứng dụng.
- 📄 **`App.tsx`**: Component gốc điều phối luồng chạy. Khai báo các trang web (React Router), cấu hình tuyến đường bảo vệ (chỉ người dùng đã đăng nhập mới vào được Dashboard) và bọc các Context.

##### 📂 `frontend/src/app/context/`
- 📄 **`AuthContext.tsx`**: Nơi quản lý trạng thái đăng nhập toàn cục. Cung cấp chức năng Đăng nhập, Đăng ký, Đăng xuất, lưu trữ token bảo mật và tự động điều hướng người dùng.

##### 📂 `frontend/src/app/pages/`
Chứa giao diện của các trang (màn hình) hoạt động độc lập.
- 📄 **`LandingPage.tsx`**: Trang chủ giới thiệu nền tảng khi người dùng chưa đăng nhập.
- 📄 **`Login.tsx`**: Giao diện trang Đăng nhập tài khoản.
- 📄 **`Register.tsx`**: Giao diện trang Đăng ký tài khoản.

##### 📂 `frontend/src/app/components/` (Các mảnh ghép giao diện)
Đây là "trái tim" của ứng dụng, chứa toàn bộ các khối chức năng.
- 📄 **`store.tsx`**: Kho lưu trữ trạng thái toàn cục (sử dụng thư viện Zustand). Quản lý danh sách Task, Subject, Reminder, lịch học. Tự động sao lưu dữ liệu xuống LocalStorage của trình duyệt.
- 📄 **`Sidebar.tsx`**: Thanh điều hướng nằm bên trái, dùng để chuyển trang (Dashboard, Tasks, Timer, Analytics, Settings).
- 📄 **`TopNav.tsx`**: Thanh điều hướng phía trên. Chứa thông báo (biểu tượng chuông), tính năng tìm kiếm, Avatar người dùng và nút chuyển đổi Sáng/Tối.
- 📄 **`Dashboard.tsx`**: Màn hình bảng điều khiển. Liệt kê tổng quan Công việc quá hạn (Đỏ), Sắp tới (Vàng), Danh sách môn học và Lịch học tuần.
- 📄 **`TaskManager.tsx`**: Màn hình quản lý công việc chi tiết. Cho phép lọc, tìm kiếm, sửa/xóa và đổi trạng thái (Todo, In-progress, Done).
- 📄 **`WeeklySchedule.tsx`**: Bảng thời khóa biểu dạng lưới (Từ Shift 1 đến Shift 4). Hỗ trợ tính năng kéo thả (drag & drop) môn học vào các ô trống.
- 📄 **`SubjectCard.tsx` & `SubjectDrawer.tsx`**: Các mảnh ghép hiển thị thông tin môn học dạng thẻ vuông, khi bấm vào sẽ mở ngăn kéo trượt (Drawer) từ cạnh phải để xem chi tiết tài liệu/kế hoạch của môn đó.
- 📄 **`Timer.tsx`**: Màn hình bấm giờ Pomodoro. Cho phép chuyển đổi chế độ Học (Study) và Chơi (Play), tự động lưu trữ thời gian sau khi kết thúc.
- 📄 **`StatsPanel.tsx` & `Analytics.tsx`**: Cụm tính toán thống kê và vẽ biểu đồ. Phân tích thời gian học tập và đánh giá hiệu suất hoàn thành bài tập của sinh viên.
- 📄 **`Profile.tsx`**: Màn hình tùy chỉnh thông tin cá nhân (Ảnh đại diện, Đổi email, Mật khẩu).
- 📄 **`CreateModal.tsx`**: Một cửa sổ nổi (Popup) đa năng dùng chung cho việc Tạo mới hoặc Chỉnh sửa (Công việc, Nhắc nhở, Môn học).
- 📄 **`FloatingActionButton.tsx`**: Nút dấu **+** trôi nổi ở góc dưới màn hình. Tối ưu diện tích hiển thị, khi hover sẽ bung ra các lối tắt tạo nhanh.
- 📄 **`Help.tsx`**: Trang tài liệu hướng dẫn người dùng làm quen với hệ thống.
- 📁 **`ui/` & `figma/`**: Thư mục chứa các chi tiết nút bấm, khung nhập liệu (UI Components) rất nhỏ, được tách riêng để tái sử dụng nhiều nơi.
