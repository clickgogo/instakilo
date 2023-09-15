import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ThinkyModule } from "./likes-thinky/thinky.module";

@Module({
  imports: [ThinkyModule],
  providers: [LikesService],
})
export class LikesModule {}
