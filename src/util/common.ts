const _DEBUG = typeof DEBUG === 'undefined' ? false : DEBUG;
const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;

export const debug = function(...rest: any[]) {
  if (!_DEBUG) return;
  console.log.apply(console, arguments);
};

export const assert = function(statement, err?, log?) {
  if (!_ASSERT) return;
  if (statement) return;
  log && console.log(log);
  throw new Error(err);
};

export default {
  assert,
  debug,
};
