import { API_URL } from '~/constants'

function fetch(url: string): Promise<{statusCode: number, data: any}> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_URL.base + url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

class API {
  static async getStandings() {
    const { data, statusCode } = await fetch('/prod/v1/current/standings_all.json')
    return {
      data,
      status: statusCode
    }
  }

  static async getGamesByDate(date: string | undefined) {
    const { data, statusCode } = await fetch(`/data/10s/prod/v1/${date}/scoreboard.json`)
    return {
      data,
      status: statusCode
    }
  }

  static async getGameDetails(date: string | undefined, gameId: string | undefined) {
    const { data, statusCode } = await fetch(`/data/10s/prod/v1/${date}/${gameId}_boxscore.json`)
    return {
      data,
      status: statusCode
    }
  }
}

export default API
