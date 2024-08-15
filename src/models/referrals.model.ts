import { SuperBaseService } from '@/services/superbase.service'
import { appLogger } from '@/utils/logger.util'

export class ReferralModel {
  private LOG_NAME = '[ReferralModel]'

  async insert(payload: { refID: string; refKey: string; referID: string }) {
    try {
      console.log('starting')
      const { data, error } = await SuperBaseService.SupabaseClient.from(
        'referral'
      )
        .insert([
          {
            refKey: `${payload.refID}-${payload.referID}`,
            refId: `${payload.refID}`,
            referId: `${payload.referID}`,
          },
        ])
        .select('*')

      if (data) {
        console.log(data)
      }
      if (error) {
        appLogger.error(`[${this.LOG_NAME}] ${error.message}`)
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }
}
