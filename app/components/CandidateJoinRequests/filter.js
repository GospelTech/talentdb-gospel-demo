import { Match, Predicates } from '@gospel/gospel-sdk-js';

const matchCandidates = new Match();
matchCandidates.match = 'record.fields.Group';
matchCandidates.predicate = Predicates.eq;
matchCandidates.value = 'CANDIDATE';

const matchApproved = new Match();
matchApproved.match = 'record.fields.Approved account';
matchApproved.predicate = Predicates.eq;
matchApproved.value = 'Not set';

export { matchApproved, matchCandidates };
