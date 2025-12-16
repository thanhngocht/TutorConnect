# Sử dụng base image Python 3.11-slim để tối ưu kích thước
FROM python:3.11-slim

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép tệp requirements.txt vào trước để tận dụng cache của Docker
# Nếu tệp này không thay đổi, các dependencies sẽ không cần cài đặt lại
COPY ./requirements.txt .

# Cài đặt các thư viện Python cần thiết
# --no-cache-dir để không lưu cache, giúp giảm kích thước image
# --default-timeout=100 để tăng thời gian chờ khi tải package
RUN pip install --no-cache-dir --default-timeout=100 -r requirements.txt

# Sao chép toàn bộ mã nguồn của backend vào thư mục làm việc trong container
COPY . .

# Cổng mặc định mà ứng dụng FastAPI sẽ chạy.
# Mặc dù cổng thực tế sẽ được xác định trong docker-compose,
# việc EXPOSE ở đây là một good practice để ghi rõ ý định.
EXPOSE 8000

# Lệnh để chạy ứng dụng sẽ được cung cấp bởi docker-compose.
# Ví dụ: ["uvicorn", "auth.main:app", "--host", "0.0.0.0", "--port", "8001"]
