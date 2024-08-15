import { telegramRequests } from '@/utils/api_requests/telegram.request'
import { appLogger } from '@/utils/logger.util'

const LOG_NAME = '[TelegramCommand::Start]'

export const balanceCommand = async (payload: any) => {
  let chat_id = payload?.message?.from?.id

  try {
    const message = `You Have 1000 SOL`

    const req = await telegramRequests.sendMessage({
      chat_id,
      message,
    })

    if (!req.success) appLogger.error(`[${LOG_NAME}] - ${req.message}`)
  } catch (error: any) {
    appLogger.error(`[${LOG_NAME} ${error.message}]`)
  }
}
