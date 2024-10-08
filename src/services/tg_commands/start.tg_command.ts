import { ReferralModel } from '@/models/referrals.model'
import { telegramRequests } from '@/utils/api_requests/telegram.request'
import { appLogger } from '@/utils/logger.util'

const LOG_NAME = '[TelegramCommand::Start]'
export const startCommand = async (payload: any) => {
  const chat_id = payload?.message?.from?.id // user telegram id
  const username = payload?.message?.from?.username

  try {
    const referralModel = new ReferralModel()

    const refID = payload?.message?.text.split(' ')[1]

    // console.log(refID, chat_id)

    if (refID) {
      await referralModel.insert({
        refID,
        referID: chat_id,
        refKey: `${refID}-${username}`,
      })
    }
    const photo_url = 'https://solana-wallet-orcin.vercel.app/assets/new.png'
    const caption = `Hey  ${username}  👩🏽‍🚀 Welcome to InFuse Wallet!

The First Multichain Web3 Non-Custodial Wallet on Telegram. Save, Transfer, Stake, Bridge Your Tokens Accross Ton,Ethereum and Solana.

Its Fuse Earning Time! Start Farming Fuse Points now!

You got Frens Plug 'Em in Earn Fuse 2gether!!`

    const req = await telegramRequests.sendPhoto({
      chat_id,
      photo_url,
      caption,
      reply_markup,
    })

    if (!req.success) appLogger.error(`[${LOG_NAME}] - ${req.message}`)
  } catch (error: any) {
    appLogger.error(`[${LOG_NAME} ${error.message}]`)
  }
}

const reply_markup = {
  resize_keyboard: 'true',
  inline_keyboard: [
    [
      {
        text: 'Join Chat',
        url: 'https://t.me/InFuseWallet',
        callback_data: 'click3',
        //web_app: 'https://t.me/InFuseWalletbot'
      },
    ],
    [
      {
        text: 'Follow Channel',
        url: 'https://t.me/InFuseChannel',
        callback_data: 'click1',
        //web_app: 'https://t.me/InFuseWalletbot'
      },
    ],

    [
      {
        text: 'Follow us on X',
        url: 'https://twitter.com/infusewallet',
        callback_data: 'click0',
        //web_app: 'https://t.me/InFuseWalletbot'
      },
    ],
  ],
}
