import { balanceCommand } from './tg_commands/balance.tg_command'
import { startCommand } from './tg_commands/start.tg_command'

export class TelegramService {
  async handleMessage(payload: any) {
    const text = payload?.message?.text

    // console.log('tg request', payload)
    // console.log('text', text)

    switch (text) {
      case '/start':
        await startCommand(payload)
        break
      case '/balance':
        await balanceCommand(payload)
        break
      default:
    }
  }
}
