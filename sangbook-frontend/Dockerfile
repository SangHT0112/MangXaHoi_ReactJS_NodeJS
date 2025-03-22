# Sử dụng Node.js phiên bản mới nhất
FROM node:22

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ file vào container
COPY . .

# Cài đặt dependencies
RUN npm install && npm run build

# Sử dụng Nginx để serve React
FROM nginx:alpine

# Copy build của React vào thư mục Nginx
COPY --from=0 /app/build /usr/share/nginx/html


ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8


# Expose cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
