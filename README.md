# Study Management Web App

Ứng dụng Quản lý Học tập bao gồm Backend bằng FastAPI và Frontend bằng React.

## Yêu cầu môi trường
- **Python 3.10+**
- **Node.js 18+**

## Hướng dẫn cài đặt và chạy dự án

Dự án được chia thành hai phần, bạn cần mở hai cửa sổ Terminal để chạy song song.

### 1. Backend (FastAPI)
Mở terminal và chạy các lệnh sau:

```powershell
cd backend
# Tạo môi trường ảo (chỉ làm lần đầu)
python -m venv venv

# Kích hoạt môi trường ảo (Windows)
.\venv\Scripts\activate

# Cài đặt thư viện
pip install -r requirements.txt

# Khởi chạy máy chủ ở cổng 8000
uvicorn app.main:app --reload --port 8000
```
Backend sẽ chạy tại: `http://localhost:8000`

### 2. Frontend (React/Vite)
Mở một terminal **mới** (giữ nguyên terminal Backend đang chạy):

```powershell
cd frontend

# Cài đặt các thư viện (chỉ làm lần đầu hoặc khi có thay đổi package.json)
npm install

# Khởi chạy giao diện web
npm run dev
```
Frontend sẽ cung cấp cho bạn một đường dẫn (thường là `http://localhost:5173`). Nhấn Ctrl + Click vào đường dẫn đó để mở trang web trên trình duyệt.

## Các tính năng chính
- Quản lý công việc (Task Management)
- Quản lý thời gian học tập (Timer)
- Bảng điều khiển tổng quan (Dashboard)
- Đăng nhập / Đăng ký (Xác thực JWT)
