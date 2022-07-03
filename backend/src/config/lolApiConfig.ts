import { IBaseApiParams } from 'twisted/dist/base/base.utils'

export const apiConfig: IBaseApiParams = {
   /**
   * If api response is 429 (rate limits) try reattempt after needed time (default true)
   */
  rateLimitRetry: true,
  /**
   * Number of time to retry after rate limit response (default 1)
   */
  rateLimitRetryAttempts: 1,
  /**
   * Concurrency calls to riot (default infinity)
   * Concurrency per method (example: summoner api, match api, etc)
   */
  concurrency: undefined,
  /**
   * Riot games api key
   */
  //key: 'RGAPI-32daf74c-5646-4980-9542-e1f954f1de9b',
  key: process.env.RIOT_API_KEY,
  /**
   * Debug methods
   */
  debug: {
    /**
     * Log methods execution time (default false)
     */
    logTime: false,
    /**
     * Log urls (default false)
     */
    logUrls: false,
    /**
     * Log when is waiting for rate limits (default false)
     */
    logRatelimits: false,
  }
}