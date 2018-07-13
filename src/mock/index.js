import account from './account';
import role from './role';
import user from './user';
import userGroup from './userGroup';

export default {
  ...account,
  ...role,
  ...user,
  ...userGroup,
};
