export const paths = {
  // auth
  base: '/',
  landing: '/landing',
  login: '/login',
  cancelPassword: '/cancel-password',
  checkDiplom: '/check-diplom',
  getContract: '/get-contract',
  statisticsDashboard: '/statistics',
  help: '/help',
  callback: '/auth/callback',
  oauth_callback: '/auth/oauth-callback',

  private: {
    statistics: '/dashboard/statistics',
    students: '/dashboard/students',
    learningProcess: '/dashboard/learning-process',
    attendance: '/dashboard/attendance',
    performance: '/dashboard/performance',
    financial: '/dashboard/financial',
    externalService: '/dashboard/external-service',
    checkAddress: '/dashboard/check-address',
    messages: '/dashboard/messages',
    settings: '/dashboard/settings',
  },
};

export const RESTRICTED_PATH = '/dashboard/restricted';
