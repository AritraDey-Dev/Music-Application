FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install react-icons tailwind-merge @supabase/auth-helpers-next @supabase/auth-helpers-react stripe @radix-ui/react-dialog zustand @supabase/auth-ui-react @supabase/auth-ui-shared react-hot-toast

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
