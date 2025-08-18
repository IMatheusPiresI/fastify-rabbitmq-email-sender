export enum EMAIL_TYPE {
  PASSWORD_RESET_EMAIL = 'PASSWORD_RESET_EMAIL',
}

export enum EMAIL_EXCHANGE {
  NOTIFICATION_MESSAGES = 'notification-messages',
}

export enum EMAIL_ROUTING_KEY {
  E_MAIL = 'e-mail',
}

export enum QUEUE_NAME {
  EMAIL_QUEUE = 'e-mail-queue',
}

export enum EMAIL_TEMPLATE_BY_TYPE {
  PASSWORD_RESET_EMAIL = 'recover-password.html',
}

export const EMAIL_QUEUE_INFO = {
  [EMAIL_TYPE.PASSWORD_RESET_EMAIL]: {
    exchange: EMAIL_EXCHANGE.NOTIFICATION_MESSAGES,
    routingKey: EMAIL_ROUTING_KEY.E_MAIL,
  },
}
