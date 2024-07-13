import type { Cue } from "~/Cue";
import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { doesSomePlayerHaveItem } from "~/doesSomePlayerHaveItem";
import { CueTypeAnimationName } from "~/CueTypeAnimationName";
import { CueAnimationName } from "~/CueAnimationName";
import { CueRenderer } from "~/CueRenderer";

export class DogToothCrawlspaceCue implements Cue {
  private readonly renderer = new CueRenderer(CueTypeAnimationName.Info, CueAnimationName.DogToothCrawlspace);

  public getRenderer(): CueRenderer {
    return this.renderer;
  }

  public register(mod: Mod, evaluate: () => void): void {
    mod.AddCallback(ModCallback.POST_NEW_ROOM, evaluate);
  }

  public evaluate(): boolean {
    if (!doesSomePlayerHaveItem(CollectibleType.DOG_TOOTH)) {
      return false;
    }

    const room = Game().GetRoom();
    const dungeonRockIdx = room.GetDungeonRockIdx();

    if (dungeonRockIdx === -1) {
      return false;
    }

    return (room.GetGridEntity(dungeonRockIdx)?.ToRock() !== undefined);
  }
}
