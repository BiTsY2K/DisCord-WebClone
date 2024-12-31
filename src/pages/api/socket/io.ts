import type { Server as HTTPServer } from "http";
import { Server as NetServer, Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";

import { Server as IOServer } from "socket.io";


export const config = {
  api: {
    bodyParser: false,
  },
};


export type NextApiResponseIOServer = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: IOServer;
    };
  };
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

const ioHandler = (_req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path,
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  }

  res.end();
};

export type { NextApiResponseWithSocket };
export default ioHandler;