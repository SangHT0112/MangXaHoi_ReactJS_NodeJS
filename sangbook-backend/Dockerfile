# Sử dụng Node.js phiên bản mới nhất
FROM node:22

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json trước để tối ưu cache layer Docker
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Cài đặt nodemon toàn cục
RUN npm install -g nodemon

# Copy toàn bộ code vào container
COPY . .

# Mở cổng (đảm bảo trùng với server)
EXPOSE 5000

# Chạy server với nodemon để tự động reload
CMD ["nodemon", "server.js"]
