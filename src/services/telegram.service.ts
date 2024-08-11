import { balanceCommand } from './tg_commands/balance.tg_command'
import { startCommand } from './tg_commands/start.tg_command'

export class TelegramService {
  async handleMessage(payload: any) {
    const text = payload?.message?.text

    // console.log('tg request', payload)
    // console.log('text', text)

    if (text?.startsWith('/start')) await startCommand(payload)
    else if (text === '/balance') await balanceCommand(payload)
  }
}
