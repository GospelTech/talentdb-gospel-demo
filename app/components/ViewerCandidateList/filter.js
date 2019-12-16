import { Filter, Match, Predicates, Operators } from '@gospel/gospel-sdk-js';

const makeMatchUserID = userID => {
  const matchUserID = new Match();
  matchUserID.match = 'record.fields.UserID';
  matchUserID.predicate = Predicates.eq;
  matchUserID.value = userID;

  return new Filter(Operators.withAll, [matchUserID]);
}

export { makeMatchUserID };
