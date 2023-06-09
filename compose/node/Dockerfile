FROM node:14.18

WORKDIR /home/node

RUN git clone https://github.com/kmchord9/chat-server-for-train.git

WORKDIR /home/node/chat-server-for-train

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]