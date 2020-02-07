import { Hand } from "../modal/hand";

export const calculateAgariKey = (handModal: Hand) => {
  handModal.sortTiles();
  const { handTiles: hand } = handModal;
};
