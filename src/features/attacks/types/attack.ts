import type { Activity } from "../options/activities";
import type { Side } from "../options/sides";
import type { Trigger } from "../options/triggers";

export type AttackTimestamp = Date;

export interface Attack {
  /** Eindeutige ID */
  id: string;

  /** Beginn der Attacke */
  start: Date;

  /** Dauer in Sekunden */
  duration: number;

  /** KIP 0–10 */
  kip: number;

  /** Betroffene Seite */
  side: Side;

  /** Tätigkeit beim Beginn */
  activity: Activity;

  /** Vermutete Auslöser */
  triggers: Trigger[];

  /** Freie Notizen */
  notes: string;

  /** Erstellungsdatum */
  createdAt: Date;

  /** Letzte Änderung */
  updatedAt: Date;
}