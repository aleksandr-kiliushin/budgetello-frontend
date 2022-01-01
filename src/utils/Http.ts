class Http {
  private static get requestOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.authToken,
        'Content-Type': 'application/json',
      },
    }
  }
  private static getFullUrl(url: string): string {
    const backendUrlStart =
      process.env.MODE === 'production'
        ? 'https://finances-app-backend.herokuapp.com:443'
        : 'http://localhost:3080'
    return backendUrlStart + url
  }

  static async delete({ url }: RequestDataWithoutPayload) {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      method: 'DELETE',
    })
    return await response.json()
  }
  static async get({ url }: RequestDataWithoutPayload) {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, this.requestOptions)
    return await response.json()
  }
  static async patch({ payload, url }: RequestDataWithPayload) {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'PATCH',
    })
    return await response.json()
  }
  static async post({ payload, url }: RequestDataWithPayload) {
    const fullUrl = this.getFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'POST',
    })
    return await response.json()
  }
}

interface RequestDataWithoutPayload {
  url: string
}
interface RequestDataWithPayload extends RequestDataWithoutPayload {
  payload: Record<string, unknown>
}

export default Http
