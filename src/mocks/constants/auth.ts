import User from '#src/types/user'

import userConstants from './user'

interface AuthConstants {
  invalidPassword: User['password']
  invalidUsername: User['username']
  validAuthToken: string
  validPassword: User['password']
  validUsername: User['username']
}

const authConstants: AuthConstants = {
  invalidPassword: 'invalidPassword123',
  invalidUsername: 'unexistingUsername123',
  validAuthToken: 'validAuthToken123',
  validPassword: 's3cret',
  validUsername: userConstants.username,
}

export default authConstants
