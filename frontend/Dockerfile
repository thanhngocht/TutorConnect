# Giai đoạn 1: Xây dựng ứng dụng React
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn của frontend
COPY . .

# Xây dựng ứng dụng để tạo ra các tệp tĩnh tối ưu cho production
RUN npm run build


# Giai đoạn 2: Phục vụ các tệp tĩnh bằng Nginx
FROM nginx:stable-alpine

# Sao chép các tệp đã được xây dựng từ giai đoạn "builder" vào thư mục phục vụ của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Sao chép tệp cấu hình Nginx tùy chỉnh của chúng ta
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 để Nginx có thể nhận request
EXPOSE 80

# Lệnh mặc định để khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
