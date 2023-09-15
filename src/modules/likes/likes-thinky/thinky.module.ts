import { Module } from "@nestjs/common";
import { thinky } from "./thinky";

@Module({
  providers: [
    {
      provide: "RETHINKDB_CONNECTION",
      useValue: thinky,
    },
  ],
  exports: ["RETHINKDB_CONNECTION"],
})
export class ThinkyModule {}
