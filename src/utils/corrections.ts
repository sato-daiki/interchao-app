import { Correction, Chunk } from '../types/correction';
import firebase from '../constants/firebase';

export const getCorrection = async (id: string): Promise<Correction | null> => {
  try {
    const doc = await firebase
      .firestore()
      .doc(`corrections/${id}`)
      .get();
    const data = doc.data();
    if (data) {
      const { objectID, profile, comments, summary, createdAt } = data;

      return {
        objectID,
        profile,
        comments,
        summary,
        createdAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};

const fillInChunks = (
  chunksToHighlight: Array<Chunk>,
  totalLength: number
): Array<Chunk> => {
  const allChunks = [] as Array<Chunk>;
  const append = (start, end, highlight, correctionNum, order): void => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight,
        correctionNum,
        order,
      });
    }
  };

  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false, null, null);
  } else {
    let lastIndex = 0;
    chunksToHighlight.forEach(chunk => {
      append(lastIndex, chunk.start, false, null, null);
      append(chunk.start, chunk.end, true, chunk.correctionNum, chunk.order);
      lastIndex = chunk.end;
    });
    append(lastIndex, totalLength, false, null, null);
  }
  return allChunks;
};

const combineChunks = (chunks: Array<Chunk>): Array<Chunk> => {
  chunks
    .sort((first, second) => first.start - second.start)
    .reduce((processedChunks: Array<Chunk>, nextChunk: Chunk) => {
      // First chunk just goes straight in the array...
      if (processedChunks.length === 0) {
        return [nextChunk];
      }
      // ... subsequent chunks get checked to see if they overlap...
      const prevChunk = processedChunks.pop();
      if (!prevChunk) {
        return [nextChunk];
      }

      if (nextChunk.start <= prevChunk.end) {
        // It may be the case that prevChunk completely surrounds nextChunk, so take the
        // largest of the end indeces.
        const endIndex = Math.max(prevChunk.end, nextChunk.end);
        processedChunks.push({
          highlight: false,
          start: prevChunk.start,
          end: endIndex,
          correctionNum: prevChunk.correctionNum,
          order: prevChunk.correctionNum,
        });
      } else {
        processedChunks.push(prevChunk, nextChunk);
      }
      return processedChunks;
    }, []);

  return chunks;
};

const findChunks = (
  correction?: Correction,
  correction2?: Correction,
  correction3?: Correction
): Array<Chunk> => {
  const chunks = [] as Chunk[];
  const arrPush = (prmCorrection: Correction, correctionNum: number): void => {
    prmCorrection.comments.forEach((comment, order) => {
      if (comment.start !== undefined && comment.end !== undefined) {
        chunks.push({
          start: comment.start,
          end: comment.end,
          highlight: false,
          correctionNum,
          order,
        });
      }
    });
  };

  if (correction) arrPush(correction, 1);
  if (correction2) arrPush(correction2, 2);
  if (correction3) arrPush(correction3, 3);
  return chunks;
};

export const findAll = ({
  text,
  correction,
  correction2,
  correction3,
}: {
  text: string;
  correction?: Correction;
  correction2?: Correction;
  correction3?: Correction;
}): Array<Chunk> => {
  const chunks = findChunks(correction, correction2, correction3);
  const chunksToHighlight = combineChunks(chunks);
  return fillInChunks(chunksToHighlight, text ? text.length : 0);
};
