import Head from './Head.ts';

export const Heads = [];

fetched_Heads = Heads.sort(function (a, b) {
  return a.lastVisitedDateTime - b.lastVisitedDateTime;
});

export const fetched_Heads