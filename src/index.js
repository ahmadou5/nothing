const telegramBot = require('node-telegram-bot-api');
//const fs = require('fs');
require('dotenv').config()

const token = process.env.TOKEN;

const bot = new telegramBot(token,{polling:true})

bot.on('message', (message) => {
    let chatID = message.from.id
    console.log(message.text)


    if(message.text === '/start') {
        bot.sendPhoto(chatID,'https://solana-wallet-orcin.vercel.app/assets/new.png',{
            'caption': `Hey  ${message.from.username}  👩🏽‍🚀 Welcome to InFuse Wallet!                                                InFuseWallet is the First Multichain Web3 Non-Custodial Wallet on tg`,
            "reply_markup": {
              "resize_keyboard": 'true',
              "inline_keyboard": [
                [
                    {
                      text: "Join Chat",
                      url: 'https://t.me/InFuseWallet',
                      callback_data: "click3",
                      //web_app: 'https://t.me/InFuseWalletbot'
                    },
                  ],
                [
                    {
                      text: "Follow Channel",
                      url: 'https://t.me/InFuseChannel',
                      callback_data: "click1",
                      //web_app: 'https://t.me/InFuseWalletbot'
                    },
                  ],

                  [
                    {
                      text: "Follow us on X",
                      url: 'https://twitter.com/infusewallet',
                      callback_data: "click0",
                      //web_app: 'https://t.me/InFuseWalletbot'
                    },
                  ],
               
               
              ],
              
            }
        })
      
    
    } else if(message.text == '/balance') {
        bot.sendMessage(chatID,'You Have 1000 SOL')
    }

})