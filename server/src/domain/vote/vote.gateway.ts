import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Vote } from "./entities/vote.entity";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class VoteGateway {
  @WebSocketServer()
  server: Server;

  public voteCreated(vote: Vote) {
    this.server.emit("voteCreated", vote);
  }
}
