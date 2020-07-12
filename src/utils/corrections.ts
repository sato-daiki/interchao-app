import { Correction, Chunk } from '../types/correction';
import firebase from '../constants/firebase';

const color1 = 'blue';
const color2 = 'green';
const color3 = 'purple';

export const getColor = (correctionNum: number | null): string => {
  if (correctionNum === 1) return color1;
  if (correctionNum === 2) return color2;
  if (correctionNum === 3) return color3;
  return color1;
};

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

const escapeRegExpFn = (string: string): string => {
  // eslint-disable-next-line no-useless-escape
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

const findChunks = (
  text,
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
      } else if (comment.original.length !== 0) {
        const searchWord = escapeRegExpFn(comment.original);
        const regex = new RegExp(searchWord, 'gi');

        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(text))) {
          const start = match.index;
          const end = regex.lastIndex;
          // We do not return zero-length matches
          if (end > start) {
            chunks.push({ highlight: false, start, end, correctionNum, order });
          }

          // Prevent browsers like Firefox from getting stuck in an infinite loop
          // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
          if (match.index === regex.lastIndex) {
            regex.lastIndex += 1;
          }
        }
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
  const chunks = findChunks(text, correction, correction2, correction3);
  const chunksToHighlight = combineChunks(chunks);
  return fillInChunks(chunksToHighlight, text ? text.length : 0);
};
