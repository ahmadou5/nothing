import { apiResponse, httpRequest } from '../api.helpers'
import { env } from '../constants/env.constants'

export const telegramRequests = {
  setTelegramWebHook: async () => {
    try {
      const res = await httpRequest().post(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/setWebhook`,
        {
          url: env.TELEGRAM_HOOK_URL,
        }
      )

      return apiResponse(true, 'Set hook URL successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  sendMessage: async (payload: {
    chat_id: string
    message: String
    reply_markup?: any
  }) => {
    try {
      const res = await httpRequest().post(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: payload.chat_id,
          text: payload.message,
          reply_markup: payload?.reply_markup,
        }
      )

      return apiResponse(true, 'message sent successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  sendPhoto: async (payload: {
    chat_id: string
    photo_url: String
    caption?: string
    reply_markup?: any
  }) => {
    try {
      const res = await httpRequest().post(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendPhoto`,
        {
          chat_id: payload.chat_id,
          photo: payload.photo_url,
          caption: payload.caption,
          reply_markup: payload?.reply_markup,
        }
      )

      return apiResponse(true, 'message sent successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },
}
