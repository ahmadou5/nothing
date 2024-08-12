import { SuperBaseService } from '@/services/superbase.service'
import { AppError } from '@/utils/custom_error/app_error'
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
            refKey: `${payload.referID}-${payload.refKey}`,
            refId: `${payload.referID}`,
            referId: `${payload.referID}`,
          },
        ])
        .select('*')

      if (data) {
        console.log('referral data', data)
      }
      if (error) {
        appLogger.error(`[${this.LOG_NAME}] ${error.message}`)
        throw new AppError(error?.message || 'something went wrong')
      }
    } catch (error: any) {
      appLogger.error(`[${this.LOG_NAME}] ${error.message}`)
    }
  }
}
