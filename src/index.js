const telegramBot = require('node-telegram-bot-api');
//const fs = require('fs');
const supabase = require('@supabase/supabase-js')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const { Telegraf, Markup } = require('telegraf');



const token = process.env.TOKEN;
const SupabaseUrl = process.env.SUPERBASEURL;
const SupabaseKey = process.env.ANONKEY;
const SupabaseClient = supabase.createClient(SupabaseUrl,SupabaseKey)
const bot = new telegramBot(token,{polling:true})
const bot1 = new Telegraf(process.env.REACT_APP_TELEGRAM_BOT_TOKEN);
const port = process.env.PORT
const app = express()

app.use(bodyParser.json())
bot.on('message', async (message) => {
    let chatID = message.from.id
    const invite = message.chat.invite_link
    const text = message.text;
    
    if(text.startsWith('/start')) {
        const userRef = message.from.id
        const refId =  text.split(' ')[1];
        const users = [];
        const getRef = async() => {
          try {
            const {data, error} = await SupabaseClient
            .from('Users')
            .select('*')
            .eq('id',refId)

            if(data) {
              console.log(data,'111')
              users = data[0].refferals
              return data[0].refferals
            }
            if(error) {
              console.log(error,'222')
            }

          } catch (error) {
            
          }
        }
        getRef()
        console.log(refId,userRef,users)
        console.log(getRef)
        if(refId) {
          try {
            console.log('starting')
            const {data, error} = await SupabaseClient
            .from('Users')
            .update({ refferals: [{ user:array_affend(message.from.username.toString()) }] })
            .eq('id',refId)

            if(data) {
              console.log(data)
            }
            if(error) {
              throw error
            }
          } catch (error) {
            console.log(error)
          }
        }
        bot.sendPhoto(chatID,'https://solana-wallet-orcin.vercel.app/assets/new.png',{
            'caption': `Hey  ${message.from.username}  👩🏽‍🚀 Welcome to InFuse Wallet!                                                                                                           
                                                                                   The First Multichain Web3 Non-Custodial Wallet on Telegram. Save, Transfer, Stake, Bridge Your Tokens Accross Ton,Ethereum and Solana.                                                                                                            
                                                                                                                                      Its Fuse Earning Time! Start Farming Fuse Points now!          
                                                                                                                                                                                                                              You got Frens Plug 'Em in Earn Fuse 2gether!!`                                                                                ,
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
app.listen(port,() => console.log(`listening to port ${port}`) )