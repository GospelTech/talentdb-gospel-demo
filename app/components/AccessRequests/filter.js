import { Filter, Match, Operators, Predicates } from '@gospel/gospel-sdk-js';

const match = new Match();
match.match = 'record.fields.Permitted';
match.predicate = Predicates.eq;
match.value = 'Not set';

const filter = new Filter(Operators.withAll, [match]);

export default filter;
