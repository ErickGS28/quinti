import type { ComponentType } from "react";
import type { VisualId } from "../../types";
import { ChooseAmountVisual } from "./ChooseAmountVisual";
import { ChoosePersonVisual } from "./ChoosePersonVisual";
import { DisasterVisual } from "./DisasterVisual";
import { MoveMoneyVisual } from "./MoveMoneyVisual";
import { PayoutVisual } from "./PayoutVisual";
import { PoolVisual } from "./PoolVisual";
import { SpreadVisual } from "./SpreadVisual";
import { WalletVisual } from "./WalletVisual";

export const VISUALS: Record<VisualId, ComponentType> = {
  wallet: WalletVisual,
  "choose-person": ChoosePersonVisual,
  "move-money": MoveMoneyVisual,
  disaster: DisasterVisual,
  payout: PayoutVisual,
  "choose-amount": ChooseAmountVisual,
  pool: PoolVisual,
  spread: SpreadVisual,
};
