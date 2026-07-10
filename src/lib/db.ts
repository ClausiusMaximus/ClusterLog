import Dexie, { type Table } from "dexie";
import type { Attack } from "@/features/attacks/types/attack";

class ClusterLogDatabase extends Dexie {
  attacks!: Table<Attack>;

  constructor() {
    super("ClusterLog");

    this.version(1).stores({
      attacks: "id,start,createdAt",
    });
  }
}

export const db = new ClusterLogDatabase();