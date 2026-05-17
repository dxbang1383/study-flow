# Hệ Thống Kiểm Thử (Standalone Testing Suite)

Thư mục này chứa toàn bộ các kịch bản kiểm thử (Test Cases) cho ứng dụng Study Flow. Việc cấu trúc thư mục này đảm bảo nguyên tắc: **Chỉ chạy test khi cần thiết, không can thiệp hay làm rác mã nguồn gốc của ứng dụng (Frontend/Backend).**

## 📂 Cấu trúc thư mục

- `unit/`: Kiểm thử các hàm logic lõi (ví dụ: tính toán màu sắc, chuỗi học tập, thuật toán tìm kiếm).
- `integration/`: Kiểm thử sự kết nối giữa các Component React và Zustand Store (Kéo thả, tạo mới, Modal).
- `e2e/`: End-to-End Test, đóng giả làm người dùng thực tế thao tác trên trình duyệt (Playwright).
- `non-functional/`: Kiểm thử phi chức năng (Hiệu năng, Khả năng truy cập - Accessibility, Tính đáp ứng trên di động).
- `fixtures/`: Nơi chứa các dữ liệu ảo (Mock Data) dùng chung.
- `reports/`: Chứa các báo cáo test sinh ra tự động (File này bị bỏ qua trong Git).

## 🚀 Cách chạy Test

1. **Chuẩn bị**: 
   Bạn chỉ cần click chuột vào file `run_all_tests.bat`. File này sẽ tự động cài đặt thư viện vào trong thư mục `test` và chạy lần lượt từ Unit -> Integration -> E2E -> Non-functional.
   
   *(Lưu ý: Đối với E2E và Non-functional, bạn cần đảm bảo Frontend đang chạy ở một cửa sổ dòng lệnh khác bằng lệnh `npm run dev` ở thư mục frontend).*

2. **Chạy thủ công từng phần**:
   Mở Terminal trong thư mục `test/` và gõ:
   - `npm run test:unit`: Chỉ chạy Unit Test
   - `npm run test:integration`: Chỉ chạy Integration Test
   - `npm run test:e2e`: Chỉ chạy E2E Test
   - `npm run test:non-functional`: Chỉ chạy Non-functional Test

## ⚙️ Công cụ sử dụng
- **Vitest & React Testing Library**: Nhanh, nhẹ, dùng cho Unit và Integration.
- **Playwright**: Mô phỏng thao tác trình duyệt cho E2E và Non-functional.
